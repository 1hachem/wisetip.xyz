import os

import dotenv
import openai

from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document

from langchain.llms import OpenAI

from src.utils.utils import text_split, parse

dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

llm = OpenAI(model_name="text-davinci-003")


def build_chain():
    prompt_template = """
    You are helpful assistant who takes in long transcripts of youtube videos, summarize to tips the user 
    needs to know in order to buy the right {product}. 
    The tips are clear bullet points extracted from the transcript.
    Avoid mentioning any advertising or promotional language. 
    start each point with a star *
    transcript : {text}
    tips : 
    """

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["product", "text"]
    )
    chain = load_summarize_chain(
        llm, chain_type="map_reduce", map_prompt=PROMPT, combine_prompt=PROMPT
    )

    return chain


def inference(product_name: str, transcript: str) -> list[str]:
    chain = build_chain()

    chunks = text_split(transcript)
    docs = [Document(page_content=c) for c in chunks]

    output = chain({"product": product_name, "input_documents": docs})["output_text"]
    output = parse(output)
    return output
