#!/usr/bin/python

import argparse
import os

import dotenv
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

dotenv.load_dotenv()


DEVELOPER_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def youtube_search(query: str, max_results: int = 5) -> list[str]:
    """return a list of video ids"""
    youtube = build(
        YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY
    )

    search_response = (
        youtube.search().list(q=query, part="id", maxResults=max_results).execute()
    )

    videos = []
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            videos.append(search_result["id"]["videoId"])

    return videos


def youtube_search_product(product: str, max_results: int = 5) -> list[str]:
    """returns top videos urls for how to choose the right [product]"""
    query = f"how to choose the right {product}"
    top_videos = youtube_search(query, max_results=max_results)
    return top_videos
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", help="Search term")
    parser.add_argument("--max-results", help="Max results", default=5)
    args = parser.parse_args()
    videos = youtube_search(args)
    print(videos)
