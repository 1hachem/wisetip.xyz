from src.lm import Chain
from src.search import youtube_search_product
from src.transcribe import YoutubeTranscriber
from src.utils.utils import save_text_file


if __name__ == "__main__":
    product = "sleeping bag"

    print("searching ...")
    top_videos = youtube_search_product(product, max_results=3)

    print("Transcribing videos ...")
    transcriber = YoutubeTranscriber()
    transcriptions = "\n".join(
        [transcriber.transcribe(top_video) for top_video in top_videos]
    )
    save_text_file(transcriptions, f"output/{product.replace(' ', '_')}.txt")

    print("Generating summary ...")
    chain = Chain()
    summary = chain.chatgpt_inference(transcriptions)

    print("wise tips :")
    print(summary)
