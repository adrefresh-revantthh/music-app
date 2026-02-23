
from fastapi import FastAPI
from bark import SAMPLE_RATE, generate_audio
from scipy.io.wavfile import write
import uuid

app = FastAPI()

@app.post("/voice")
async def generate_voice(data: dict):
    text = data["text"]

    audio = generate_audio(text)

    filename = f"audio_{uuid.uuid4()}.wav"
    write(filename, SAMPLE_RATE, audio)

    return {"file": filename}