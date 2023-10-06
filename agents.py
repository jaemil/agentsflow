import asyncio
import sys
from autogen import AssistantAgent, UserProxyAgent, ConversableAgent, config_list_from_json

class WebSocketUserProxyAgent(UserProxyAgent):
    def __init__(self, name, websocket, **kwargs):
        super().__init__(name, **kwargs)
        self.websocket = websocket

    def get_human_input(self, message):
        print("human_input", message)
        self.websocket.send_json({"message": message})
        clientMessage = self.websocket.receive_json()
        if "message" in clientMessage:
            return clientMessage["message"]
        # await self.websocket.receive_json()
        # return message
   
def runAgent(initial_message, agent_name, websocket):
    print("Running agent")

    config_list = config_list_from_json(
        "OAI_CONFIG_LIST",
        filter_dict={
            "model": ["gpt-3"],
        },
    )

    assistant = AssistantAgent("assistant", llm_config={"config_list": config_list})
    user_proxy = WebSocketUserProxyAgent(agent_name, websocket=websocket, code_execution_config={"work_dir": "coding"})
    # asyncio.create_task(user_proxy.a_initiate_chat(assistant, message=initial_message))
    user_proxy.initiate_chat(assistant, message=initial_message)
    print("user_proxy", user_proxy)

    return agent_name


# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         sys.exit(1)

#     initial_message = " ".join(sys.argv[1:])
#     agent = runAgent(initial_message)