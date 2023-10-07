import json
from typing import Union, Dict, Optional

from autogen.agentchat.agent import Agent
from autogen_client.util import get_name
from autogen import UserProxyAgent as UserProxyAgentOrigin
import logging

logging.basicConfig(filename='agent.log', level=logging.DEBUG)


class UserProxyAgent(UserProxyAgentOrigin):
    def __init__(self, name, send_queue, receive_queue, **kwargs):
        super().__init__(name, **kwargs)
        self.send_queue = send_queue
        self.receive_queue = receive_queue

    def get_human_input(self, message):
        logging.info(f"Received agent output: {message}")
        self.receive_queue.put({
            "message": message,
            "sender": "assistant"
        })
        human_message = self.send_queue.get()
        logging.info(f"Sending human message: {human_message}")
        return human_message

    def receive(
            self,
            message: Union[Dict, str],
            sender: Agent,
            request_reply: Optional[bool] = None,
            silent: Optional[bool] = False
    ):
        logging.info(f"Human received message: {message} from {get_name(sender)}")
        self.receive_queue.put({
            "message": message,
            "sender": get_name(sender)
        })
        super().receive(message, sender, request_reply, silent)
