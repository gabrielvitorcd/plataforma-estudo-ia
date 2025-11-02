# app/core/config.py
import os
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env na inicialização
load_dotenv()

class Settings:
    # --- Supabase ---
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    SUPABASE_PROJECT_ID = os.getenv("SUPABASE_PROJECT_ID")
    SUPABASE_JWKS_URL = os.getenv("SUPABASE_JWKS_URL")
    SUPABASE_AUDIENCE = os.getenv("SUPABASE_AUDIENCE")
    SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
    SUPABASE_ALGORITHM = os.getenv("SUPABASE_ALGORITHM", "HS256")

    # --- Banco de Dados (Postgres Supabase ou local) ---
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_PORT = os.getenv("DB_PORT", "5432")

    # --- CORS ---
    ALLOWED_ORIGINS = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000"
        ).split(",")
        if origin.strip()
    ]

    # --- Ambiente ---
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

settings = Settings()
