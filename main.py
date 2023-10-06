import asyncio
import queue

from fastapi import FastAPI, WebSocket
from agents import run_agent
from config import config
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from multiprocessing import Manager

app = FastAPI()
config()

manager = Manager()
send_queue = manager.Queue()
receive_queue = manager.Queue()


@app.get("/startAgent")
async def startAgent():
    await run_agent("What is your purpose?", "testagentname", send_queue, receive_queue)
    print("Running agent")
    return "Agent started successfully"


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    agents = {}
    await websocket.accept()

    def check_queue():
        while True:
            try:
                _message = receive_queue.get(False)
                asyncio.run(websocket.send_json({"message": _message}))
            except queue.Empty:
                continue

    executor = ThreadPoolExecutor()
    executor.submit(check_queue)
    print('queue spawned')
    while True:
        data = await websocket.receive_json()
        print("ws data: ", data)
        action = data.get("action")
        agent_name = data.get("agent_name")
        message = data.get("message")

        if action == "startAgent":
            print("Starting agent")
            loop = asyncio.get_event_loop()
            with ProcessPoolExecutor() as pool:
                loop.run_in_executor(
                    pool,
                    run_agent(
                        initial_message="What is your purpose?",
                        agent_name=agent_name,
                        websocket=websocket,
                        send_queue=send_queue,
                        receive_queue=receive_queue
                    ))

            print("agents", agents)

        if action == "sendMessage":
            send_queue.put(message)