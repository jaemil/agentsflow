import asyncio
from fastapi import FastAPI, WebSocket
from agents import runAgent
from config import config
import subprocess
import time
from concurrent import futures
from subprocess import Popen, PIPE
from multiprocessing import Process, Queue
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

app = FastAPI()
config()

@app.get("/startAgent")
async def startAgent():

    # await runAgent("What is your purpose?", "testname", we)
    await runAgent("What is your purpose?", "testagentname")
    print("Running agent")

    # List of commands to execute
    # command = "ping google.com"  # Replace with your command

    # # Launch the command in a CMD window with stdout and stderr pipes
    # cmd_process = subprocess.Popen(
    #     ["cmd.exe", "/c", command],
    #     stdout=subprocess.PIPE,
    #     stderr=subprocess.PIPE,
    #     encoding='cp437',  # For converting bytes to string
    #     text=True  # For handling text input/output
    # )

    # # Read and print the output in real-time
    # while True:
    #     line = cmd_process.stdout.readline()
    #     if not line:
    #         break
    #     print(line, end="")  # Print without newline

    # # Wait for the command to complete
    # cmd_process.wait()

    # Close the CMD window
    # cmd_process.stdout.close()
    # cmd_process.stderr.close()
    # pipe = Popen(['start', 'cmd', '/k', 'python agents.py What is your purpose?'])
    # queue = Queue()
    # p = Process(target=runAgent("What is your purpose?"), args=(queue, 1))
    # p.start()    
    # pipe.wait()

    # pipe = Popen(['start', 'cmd'], stdin=PIPE, stdout=PIPE, stderr=PIPE, shell=False)
    # inputdata="This is the string I will send to the process"
    # stdin, stdout, stderr = pipe.communicate(input=inputdata)

    # stdin.write(b'test\n')

    # if pipe:
    #     # The subprocess was started successfully, you can write to its stdin here
    #     stdin.write(b'test\n')
    # else:
    #     print("Subprocess not started")

    return "Agent started successfully"

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    agents = {}
    await websocket.accept()

    while True:
        print("data")
        data = await websocket.receive_json()
        print("data", data)
        action = data.get("action")
        agentName = data.get("agentName")
        message = data.get("message")
        
        if action == "startAgent":
            print("Starting agent")
            loop = asyncio.get_event_loop()
            with ProcessPoolExecutor() as pool:
                loop.run_in_executor(pool, loop.create_task(runAgent("What is your purpose?", "testname", websocket)))

            # agents[agentName] =
            print("agents", agents)

        if action == "sendMessage":
            await websocket.send_text(f"Message text was: {message}")
        

# from fastapi import FastAPI, WebSocket
# from fastapi.middleware.cors import CORSMiddleware
# from flaml import autogen

# # Set up configurations
# config_list = autogen.config_list_from_json(
#     "OAI_CONFIG_LIST",
#     filter_dict={
#         "model": ["gpt-4"],
#     },
# )

# llm_config = {
#     "request_timeout": 600,
#     "seed": 42,
#     "config_list": config_list,
#     "temperature": 0,
# }

# # Construct agents
# assistant = autogen.AssistantAgent(
#     name="assistant",
#     llm_config=llm_config,
# )

# user_proxy = autogen.UserProxyAgent(
#     name="user_proxy",
#     human_input_mode="TERMINATE",
#     max_consecutive_auto_reply=10,
#     is_termination_msg=lambda x: x.get(
#         "content", "").rstrip().endswith("TERMINATE"),
#     code_execution_config={"work_dir": "web"},
#     llm_config=llm_config,
#     system_message="""Reply TERMINATE if the task has been solved at full satisfaction.
# Otherwise, reply CONTINUE, or the reason why the task is not solved yet."""
# )

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
#     allow_credentials=True,
# )


# @app.get("/health")
# async def health():
#     """Check the api is running"""
#     return {"status": "🤙"}


# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()

#     while True:
#         await user_proxy.a_initiate_chat(
#             assistant,
#             "I want to know about this project: https://python.langchain.com/",
#         )

#         response = user_proxy.last_message()

#         await websocket.send_text(f"Message text was: {response}")