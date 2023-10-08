from typing import Any, Dict, List

from autogen import config_list_from_json, AssistantAgent
from agentsflow.agents import UserProxyAgent
from concurrent.futures import ThreadPoolExecutor
import queue
import logging

logging.basicConfig(filename='agent.log', level=logging.DEBUG)


def run_agents(
        initial_message: str,
        agent_name: str,
        llm_config: Dict,
        code_execution_config: Dict,
        send_queue: queue.Queue[Any],
        receive_queue: queue.Queue[Any]):

    logging.info(f"Running {agent_name} agent.")

    assistant = AssistantAgent(
        name=agent_name,
        # send_queue=send_queue,
        # receive_queue=receive_queue,
        llm_config=llm_config,
        code_execution_config=code_execution_config
    )
    user_proxy = UserProxyAgent(
        name='User',
        send_queue=send_queue,
        receive_queue=receive_queue,
        code_execution_config=code_execution_config
    )
    user_proxy.initiate_chat(assistant, message=initial_message)

    def check_send_queue():
        while True:
            if not send_queue.empty():
                item = send_queue.get()
                logging.info(
                    f"Sending message: {item['message']} to {item['sender']}")
                user_proxy.send(item['message'], item['sender'])

    with ThreadPoolExecutor() as executor:
        executor.submit(check_send_queue)

    return agent_name
