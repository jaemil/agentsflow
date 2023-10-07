import openai
import os
from dotenv import load_dotenv

load_dotenv()


def config(): 
    openai.api_key = os.getenv("OPENAI_API_KEY")
