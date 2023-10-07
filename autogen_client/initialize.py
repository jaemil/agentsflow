from autogen import config_list_from_json, AssistantAgent
from autogen_client.agents import UserProxyAgent
from concurrent.futures import ThreadPoolExecutor
import logging

logging.basicConfig(filename='agent.log', level=logging.DEBUG)


def run_agent(initial_message, agent_name, send_queue, receive_queue):
    logging.info("Running agent")

    config_list = config_list_from_json(
        "OAI_CONFIG_LIST",
        filter_dict={
            "model": ["gpt-3.5-turbo"],
        },
    )

    assistant = AssistantAgent(
        "assistant",
        # send_queue=send_queue,
        # receive_queue=receive_queue,
        llm_config={"config_list": config_list},
        code_execution_config={
            "work_dir": "coding",
            "use_docker": False
        }
    )
    user_proxy = UserProxyAgent(
        agent_name,
        send_queue=send_queue,
        receive_queue=receive_queue,
        # human_input_mode="ALWAYS",
        code_execution_config={
            "work_dir": "coding",
            "use_docker": False
        }
    )
    user_proxy.initiate_chat(assistant, message=initial_message)

    def check_send_queue():
        while True:
            if not send_queue.empty():
                item = send_queue.get()
                logging.info(f"Sending message: {item['message']} to {item['sender']}")
                user_proxy.send(item['message'], item['sender'])

    with ThreadPoolExecutor() as executor:
        executor.submit(check_send_queue)

    return agent_name
