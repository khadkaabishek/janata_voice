from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from  hbutils import save_audio

app = FastAPI(title="Audio Upload API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-audio")
async def upload_audio(audio: UploadFile = File(...)):
    try:
        filename = save_audio(audio)
        return JSONResponse(
            status_code=200,
            content={"message": "Audio uploaded successfully", "filename": filename}
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
