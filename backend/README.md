# buyer-advice backend

- Collects top k videos on youtube for how to choose the best [any thing].
- Transcribe videos using whisper.
- Summarize transcriptions using gpt=3.
- Return results as a list of advice.

## Setup

- create a new `.env` as showed in `.env.example`, to get you APIs keys see [openai](https://platform.openai.com/account/api-keys) and [youtube](https://console.cloud.google.com/apis/credentials).

```
OPENAI_API_KEY=sk-..
YOUTUBE_API_KEY=AI...
```

- install dependencies.

```bash
pip install -r requirements.txt
```

- run API.

```bash
uvicorn api:app --reload
```
