from src.lm import inference
from src.search import youtube_search
from src.transcribe import YoutubeTranscriber
from src.utils.utils import save_text_file


def search(product: str, max_results: int = 5) -> list[str]:
    query = f"how to choose the right {product}"
    top_videos = youtube_search(query, max_results=max_results)
    return top_videos


if __name__ == "__main__":
    product = "studying desk"
    print("searching ...")
    top_videos = search(product, max_results=10)
    print("Transcribing videos ...")
    transcriber = YoutubeTranscriber()

    transcriptions = "\n".join(
        [transcriber.transcribe(top_video) for top_video in top_videos]
    )
    save_text_file(transcriptions, f"output/{product.replace(' ', '_')}.txt")
    print("Generating summary ...")
    summary = inference(product, transcriptions)
    print("wise tips :")
    print(summary)
