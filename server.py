import asyncio
import logging
import queue
from functools import partial

from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from autogen_client.initialize import run_agent
from autogen_client.config import config
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from multiprocessing import Manager
import uvicorn

app = FastAPI()
config()

logging.basicConfig(filename='agent.log', level=logging.DEBUG)

manager = Manager()
send_queue = manager.Queue()
receive_queue = manager.Queue()

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    # serve view here
    return templates.TemplateResponse("index.html", {"request": request})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    logging.info('Starting websocket server.')
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
    await websocket.send_json({
        "message": "connected"
    })
    while True:
        data = await websocket.receive_json()
        logging.debug(f"raw from client: {data}")
        action = data.get("action")
        agent_name = data.get("agent_name")
        message = data.get("message")

        if action == "start_agent":
            logging.info("Starting agent(s)")
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

        if action == "send_message":
            send_queue.put(message)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8999)
