from fastapi import APIRouter, Depends
from app.database import get_db_connection

router = APIRouter(prefix="/track", tags=["Track"])

@router.get("/list")
def list_track(db=Depends(get_db_connection)):
    cur = db.cursor()
    cur.execute("SELECT id, code, name FROM public.track ORDER BY name ASC")
    rows = cur.fetchall()
    tracks = [{"id": r[0], "code": r[1], "name": r[2]} for r in rows]
    return tracks
