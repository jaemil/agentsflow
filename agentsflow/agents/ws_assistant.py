from autogen import AssistantAgent
import logging

logging.basicConfig(filename='agent.log', level=logging.DEBUG)


class WebSocketAssistantAgent(AssistantAgent):
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
