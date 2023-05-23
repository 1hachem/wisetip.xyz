import os

import dotenv
import openai

dotenv.load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


## chatgpt completion


def chatgpt_completion(transcript: str, product: str) -> str:
    conversation = [
        {
            "role": "system",
            "content": f"""You are helpful assistant who takes in long transcripts 
         of youtube videos, summarize it to exactly what I need to know to buy the right {product}. 
         The summary is a in the format of bullet points of the main pieces of advice in the transcript
         put each bullet point between two #.""",
        },
        {"role": "user", "content": "videos transcript :" + transcript},
    ]
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    return completion.choices[0].message["content"]
