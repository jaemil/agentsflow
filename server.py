import asyncio
import queue
from functools import partial

from fastapi import FastAPI, WebSocket
from autogen_client.initialize import run_agent
from autogen_client.config import config
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from multiprocessing import Manager
import uvicorn

app = FastAPI()
config()

manager = Manager()
send_queue = manager.Queue()
receive_queue = manager.Queue()


@app.get("/")
async def index():
    # serve view here
    pass


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    def check_queue():
        while True:
            try:
                _message = receive_queue.get(False)
                asyncio.run(websocket.send_json(_message))
            except queue.Empty:
                continue

    executor = ThreadPoolExecutor()
    executor.submit(check_queue)
    print('queue spawned')
    await websocket.send_json({
        "message": "connected"
    })
    while True:
        data = await websocket.receive_json()
        print("ws data: ", data)
        action = data.get("action")
        agent_name = data.get("agent_name")
        message = data.get("message")

        if action == "start_agent":
            print("Starting agent")
            loop = asyncio.get_event_loop()
            pool = ProcessPoolExecutor()
            loop.run_in_executor(
                pool,
                partial(
                    run_agent,
                    initial_message=message,
                    agent_name=agent_name,
                    send_queue=send_queue,
                    receive_queue=receive_queue,
                )
            )

            print("We have run the agent.")

        if action == "send_message":
            send_queue.put(message)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8999)
