# todo

- [x] fastAPI for backend
- [x] add we already got your email (you joined wait list again !)
- [x] add example to mail lis
- [ ] auth with google
- [x] change ui colors @hachem
- [ ] general feedback
- [ ] populate database manually @hachem
- [ ] add route to populate database automatically (from a jsonl containing items names)
- [ ] add description endpoint fastapi @hachem
- [x] add payment popup and track coins/credits
- [x] vision/about us in the landing page

chatgpt -> list items -> json -> node express -> for each item check if it exists if not -> fastapi -> tips and description -> populate database

search for item -> 404 this item is not in the database pay 10 coins to add it ! -> payment popup (to buy coins)

# specs

python : `3.11.3`

# run backend

```bash
python -m venv .venv
```

install requirements

```bash
pip install -r requirements.txt
pip install -e .
```

run api

```bash
uvicorn api:app --port 3002 --reload
```

# Wisetip

Useful tips around the internet are buried under a lot of noise (intros, stretched content ...), this is mainly due to policies and recommendation algorithms of content platforms.
We value your time, memory and attention, all the tips you need are in one place straight to the point.

## About us

we are two guys trying to bootstrap useful digital tools,
we want to make these tools protect human weaknesses instead of exploiting them,
we want this tools to solve one problem and one problem only at a time,
less is more, with the age of generative AI less content is more, we aim to provide little but high quality content,
we want to reverse engineer platforms such as youtube, facebook, instagram ... and make alternatives that increase the quality of life for people, protect their attention, social life, spending habits ... and so on.

we make profit from donations and one-time payments.
