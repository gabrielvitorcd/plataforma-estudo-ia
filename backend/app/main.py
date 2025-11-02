# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import users

app = FastAPI(title="Plataforma de Estudos - Backend")

# CORS (libera o frontend Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(users.router)

@app.get("/health")
async def health():
    return {"status": "ok"}
