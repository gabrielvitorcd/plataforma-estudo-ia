# app/services/user_service.py
from fastapi import HTTPException
from app.schemas.user import User
from app.database import get_db_connection

def sync_user(user_payload):
    """Cria ou retorna o usuário autenticado do Supabase"""
    user_id = user_payload.get("id") or user_payload.get("sub")
    email = user_payload.get("email") or user_payload.get("user_metadata", {}).get("email")


    if not user_id or not email:
        raise HTTPException(status_code=400, detail="Token sem informações de usuário")

    conn = get_db_connection()
    cur = conn.cursor()

    # Verifica se já existe
    cur.execute("SELECT id, email, username, xp_total, created_at, updated_at FROM app_user WHERE id = %s", (user_id,))
    result = cur.fetchone()

    if result:
        cur.close()
        conn.close()
        return User(
            id=result[0],
            email=result[1],
            username=result[2],
            xp_total=result[3],
            created_at=result[4],
            updated_at=result[5]
        )

    # Se não existir, cria
    cur.execute(
        "INSERT INTO app_user (id, email) VALUES (%s, %s) RETURNING id, email, username, xp_total, created_at, updated_at",
        (user_id, email)
    )
    new_user = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return User(
        id=new_user[0],
        email=new_user[1],
        username=new_user[2],
        xp_total=new_user[3],
        created_at=new_user[4],
        updated_at=new_user[5]
    )
