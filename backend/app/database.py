import psycopg2
from app.core.config import settings

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="54322",  # <- Porta correta do Supabase local
        dbname="postgres",  # ou o nome do banco que o Supabase criou
        user="postgres",
        password="postgres"  # senha padrão do Supabase local
    )
    return conn
