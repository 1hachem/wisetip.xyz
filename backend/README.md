# wisetip backend

- Collects top k videos on youtube for how to choose the best [any thing].
- get youtube transcriptions for the all the videos (if it exists).
- Summarize transcriptions using bard.
- format summary using gpt-3.
- Return results as a list of tips.

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
