# app/models/user.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: str
    email: str
    username: Optional[str] = None
    xp_total: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
