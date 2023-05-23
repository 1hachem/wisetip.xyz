import os
import uuid

import whisper
from pytube import YouTube

from src.lm import chatgpt_completion
from src.search import youtube_search

whisper_model = whisper.load_model("tiny")


def search(product: str, max_results: int = 5) -> list[str]:
    query = f"how to choose the right {product}"
    top_videos = youtube_search(query, max_results=max_results)
    return top_videos


def download_videos(product: str, top_videos: list[str]) -> list[str]:
    dir = "output/" + product.replace(" ", "_")
    os.mkdir(dir)
    audio_files = []
    for video in top_videos:
        filename = str(uuid.uuid1()) + ".mp4"
        try:
            video_path = (
                YouTube(video)
                .streams.filter(only_audio=True)
                .first()
                .download(filename=f"{dir}/{filename}")
            )
            audio_files.append(video_path)
        except:
            pass

    return audio_files


def transcribe(audio_files: list[str]) -> list[str]:
    transcriptions = []
    for audio_file in audio_files:
        transcription = whisper_model.transcribe(audio_file)
        transcriptions.append(transcription["text"])
    return transcriptions


def summarize(transcriptions: list[str], product: str) -> list[str]:
    summary = []
    for transcription in transcriptions:
        response = chatgpt_completion(transcription, product)
        response = response.replace("\n", "")
        response = response.split("#")
        summary += response
    return summary


if __name__ == "__main__":
    product = "sleeping bag"
    print("searching ...")
    top_videos = search(product, max_results=2)
    print("Downloading videos ...")
    audio_files = download_videos(product, top_videos)
    print("Transcribing videos ...")
    transcriptions = transcribe(audio_files)
    print("Generating summary ...")
    summary = summarize(transcriptions, product)
    print("buyer advice:")
    print(summary)
