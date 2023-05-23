#!/usr/bin/python

# This sample executes a search request for the specified search term.
# Sample usage:
#   python search.py --q=surfing --max-results=10
# NOTE: To use the sample, you must provide a developer key obtained
#       in the Google APIs Console. Search for "REPLACE_ME" in this code
#       to find the correct place to provide that key..
import argparse
import os

import dotenv
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

dotenv.load_dotenv()


# Set DEVELOPER_KEY to the API key value from the APIs & auth > Registered apps
# tab of
#   https://cloud.google.com/console
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def youtube_search(query: str, max_results: int = 5) -> list[str]:
    youtube = build(
        YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY
    )

    # Call the search.list method to retrieve results matching the specified
    # query term.
    search_response = (
        youtube.search().list(q=query, part="id", maxResults=max_results).execute()
    )

    videos = []

    # Add each result to the appropriate list, and then display the lists of
    # matching videos, channels, and playlists.
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            videos.append(
                "https://www.youtube.com/watch?v=" + search_result["id"]["videoId"]
            )
    return videos


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", help="Search term")
    parser.add_argument("--max-results", help="Max results", default=5)
    args = parser.parse_args()
    videos = youtube_search(args)
    print(videos)
