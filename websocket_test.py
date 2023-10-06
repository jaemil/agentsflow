from fastapi import FastAPI, WebSocket
import autogen
import uvicorn
import json

config_list = [
    {
        "model": "mistral",
        "api_base": "http://localhost:8000",
        "api_type": "open_ai",
        "api_key": "NULL"
    }
]

assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={
        "request_timeout": 600,
        "seed": 41,
        "config_list": config_list,
        "temperature": 0,
    },
    system_message="You are a financial expert.",
)

user_proxy = autogen.UserProxyAgent(
    name="user",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=1,
    code_execution_config=False,
    default_auto_reply=None,
)

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:

        try:
            data = await websocket.receive_json()  # Receive JSON object

            if "method" not in data or "message" not in data:
                await websocket.send_json({"error": "Invalid JSON"})
                continue

            method = data["method"]
            message = data["message"]

            print(method)
            print(message)

            if method == "start_chat":
                await user_proxy.a_initiate_chat(assistant, message=message)
                response = user_proxy.last_message(agent=assistant)
                print(response)
                await websocket.send_json({"response": str(response["content"])})  # Send JSON object
            elif method == "send_message":
                await user_proxy.a_send(message, recipient=assistant)
                response = user_proxy.last_message(agent=assistant)
                print(response)
                await websocket.send_json({"response": str(response)})  # Send JSON object
            else:
                await websocket.send_json({"error": "Unknown command"})
        except json.JSONDecodeError:
            await websocket.send_json({"error": "Invalid JSON"})
            continue

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)