# app/routers/study.py
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.database import get_db_connection

router = APIRouter(prefix="/study", tags=["study"])

VALID_TRACKS = {"enem","concursos"}

@router.post("/{track}/sessions")
def start_session(track: str, subject_slug: str, user=Depends(get_current_user)):
    if track not in VALID_TRACKS:
        raise HTTPException(400, "track inválido")
    conn = get_db_connection(); cur = conn.cursor()
    cur.execute("select 1 from subject where track=%s and slug=%s", (track, subject_slug))
    if not cur.fetchone():
        cur.close(); conn.close()
        raise HTTPException(404, "subject não encontrado para essa track")

    cur.execute("""
      insert into study_session (user_id, track, subject_slug)
      values (%s, %s, %s) returning id, started_at
    """, (user["id"], track, subject_slug))
    row = cur.fetchone(); conn.commit(); cur.close(); conn.close()
    return {"session_id": row[0], "started_at": row[1]}

@router.post("/{track}/attempts")
def record_attempt(track: str, subject_slug: str, correct: bool, duration_ms: int, user=Depends(get_current_user)):
    if track not in VALID_TRACKS:
        raise HTTPException(400, "track inválido")
    conn = get_db_connection(); cur = conn.cursor()
    cur.execute("""
      insert into attempt (user_id, track, subject_slug, correct, duration_ms)
      values (%s, %s, %s, %s, %s)
      returning id, created_at
    """, (user["id"], track, subject_slug, correct, duration_ms))
    row = cur.fetchone()

    # Atualiza theta simples
    cur.execute("select theta from mastery_estimate where user_id=%s and track=%s and subject_slug=%s",
                (user["id"], track, subject_slug))
    theta = (cur.fetchone() or [0.0])[0]
    # ELO/IRT simplificado
    d = theta  # target ~ matching
    import math
    p = 1.0 / (1.0 + math.exp(-(theta - d)))
    delta = (1 - p) if correct else (-p)
    new_theta = theta + 0.1 * delta
    cur.execute("""
      insert into mastery_estimate (user_id, track, subject_slug, theta)
      values (%s,%s,%s,%s)
      on conflict (user_id, track, subject_slug)
      do update set theta=excluded.theta, updated_at=now()
    """, (user["id"], track, subject_slug, new_theta))

    conn.commit(); cur.close(); conn.close()
    return {"attempt_id": row[0], "created_at": row[1], "theta": new_theta}
