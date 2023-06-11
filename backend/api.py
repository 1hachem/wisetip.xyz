from fastapi import FastAPI

from src.lm import Chain
from src.search import youtube_search_product
from src.transcribe import YoutubeTranscriber
from src.utils.utils import save_text_file

app = FastAPI()


@app.get("/generate_summary/{product}")
def generate_summary(product: str) -> list[str]:
    # Searching
    top_videos = youtube_search_product(product, max_results=3)

    # Transcribing videos
    transcriber = YoutubeTranscriber()
    transcriptions = "\n".join(
        [transcriber.transcribe(top_video) for top_video in top_videos]
    )
    save_text_file(transcriptions, f"output/{product.replace(' ', '_')}.txt")

    # Generating summary
    chain = Chain()
    summary = chain.chatgpt_inference(transcriptions)

    return summary


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
