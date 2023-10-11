import asyncio
import logging
import queue
from functools import partial

from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from agentsflow.initialize import run_agents
from agentsflow.config import config
from autogen import config_list_from_json
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


@app.get("/dev", response_class=HTMLResponse)
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
                    run_agents,
                    initial_message=message,
                    agent_name=agent_name,
                    llm_config={
                        "config_list": config_list_from_json(
                            "OAI_CONFIG_LIST",
                            filter_dict={
                                "model": ["gpt-3.5-turbo"],
                            },
                        ),
                        "request_timeout": 120,
                    },
                    code_execution_config={
                        "work_dir": "workspace",
                        "use_docker": False,
                        "last_n_messages": 5,
                    },
                    send_queue=send_queue,
                    receive_queue=receive_queue,
                )
            )

        if action == "send_message":
            send_queue.put(message)


app.mount("/", StaticFiles(directory="static", html=True), name="static")


def uvi():
    uvicorn.run(app, host="0.0.0.0", port=8999)


if __name__ == "__main__":
    uvi()
