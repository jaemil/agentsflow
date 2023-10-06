import asyncio
import sys
from autogen import AssistantAgent, UserProxyAgent, ConversableAgent, config_list_from_json
from concurrent.futures import ThreadPoolExecutor
import logging

logging.basicConfig(filename='agent.log', level=logging.DEBUG)


class WebSocketUserProxyAgent(UserProxyAgent):
    def __init__(self, name, send_queue, receive_queue, **kwargs):
        super().__init__(name, **kwargs)
        self.send_queue = send_queue
        self.receive_queue = receive_queue

    def get_human_input(self, message):
        logging.info(f"Received agent output: {message}")
        self.receive_queue.put(message)
        human_message = self.send_queue.get()
        logging.info(f"Sending human message: {human_message}")
        return human_message        


def run_agent(initial_message, agent_name, send_queue, receive_queue):
    logging.info("Running agent")

    config_list = config_list_from_json(
        "OAI_CONFIG_LIST",
        filter_dict={
            "model": ["gpt-3.5-turbo"],
        },
    )

    assistant = AssistantAgent("assistant", llm_config={"config_list": config_list})
    user_proxy = WebSocketUserProxyAgent(agent_name, send_queue=send_queue, receive_queue=receive_queue, code_execution_config={"work_dir": "coding"})
    user_proxy.initiate_chat(assistant, message=initial_message)
    logging.info(f"User proxy: {user_proxy}")

    def check_send_queue():
        while True:
            if not send_queue.empty():
                message = send_queue.get()
                logging.info(f"Sending message: {message}")
                user_proxy.send(message)

    with ThreadPoolExecutor() as executor:
        executor.submit(check_send_queue)

    return agent_name
