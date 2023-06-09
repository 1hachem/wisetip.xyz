from abc import ABC, abstractmethod
from youtube_transcript_api import YouTubeTranscriptApi
import whisper


class Transcriber(ABC):
    def __init__(self):
        pass

    @abstractmethod
    def transcribe(self) -> str:
        """turn video into text"""


class Whisper(Transcriber):
    def __init__(self, model_name: str, **kwargs):
        super().__init__(**kwargs)
        self.model = whisper.load_model(model_name)

    def transcribe(self, path: str) -> str:
        transcription = self.model.transcribe(path)
        transcription = transcription["text"]
        return transcription


class YoutubeTranscriber(Transcriber):
    def __init__(self, **kwargs: any):
        super().__init__(**kwargs)

    def transcribe(self, video_id: str) -> str | None:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            transcript = [t["text"] for t in transcript]
            return " ".join(transcript)
        except:
            return None
