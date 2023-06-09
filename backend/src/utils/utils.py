from langchain.text_splitter import TokenTextSplitter


def parse(text: str) -> list[str]:
    output = text.replace("\n", "")
    output = output.split("*")
    output = [_ for _ in output if _ != ""]
    return output


def text_split(text: str, chunk_size: int = 1000, chunk_overlap: int = 20):
    text_splitter = TokenTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
    return text_splitter.split_text(text)


def save_text_file(text: str, path: str):
    with open(path, "w") as f:
        f.write(text)
