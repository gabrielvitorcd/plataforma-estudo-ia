from pydantic import BaseModel
from typing import Optional


class StudyMaterialCreate(BaseModel):
    topic_id: str
    title: str
    type: str = "teoria"
    source: str
    content_url: str
    summary: str
    reading_time_min: int
    difficulty_level: int
