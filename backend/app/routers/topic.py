from fastapi import APIRouter, Depends
from app.database import get_db_connection

router = APIRouter(prefix="/topic", tags=["Topic"])

@router.get("/list")
def list_topics(db=Depends(get_db_connection)):
    cur = db.cursor()
    cur.execute("SELECT id, name FROM public.topic ORDER BY name ASC")
    rows = cur.fetchall()
    topics = [{"id": r[0], "name": r[1]} for r in rows]
    return topics
