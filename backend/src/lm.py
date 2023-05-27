import os

import dotenv
import openai

from langchain.prompts import PromptTemplate
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import TokenTextSplitter
from langchain.docstore.document import Document

from langchain.llms import OpenAI

dotenv.load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

llm = OpenAI(model_name="text-davinci-003")


def parse(text: str) -> list[str]:
    output = text.replace("\n", "")
    output = output.split("*")
    return output[1:]


def text_split(text: str, chunk_size: int = 1000, chunk_overlap: int = 20):
    text_splitter = TokenTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    return text_splitter.split_text(text)


def build_chain():
    prompt_template = """
    You are helpful assistant who takes in long transcripts text
    of youtube videos, summarize it to exactly what the user to know to buy the right {product}. 
    The summary is in the format of bullet points of the main pieces of advice in the transcript. 
    start each point with a star *.
    text : {text}
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
