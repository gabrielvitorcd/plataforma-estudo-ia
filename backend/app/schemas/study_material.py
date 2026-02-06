from pydantic import BaseModel
from typing import Optional


class StudyMaterialCreate(BaseModel):
    topic_id: str
    title: str
    source: str
    content_path: Optional[str] | None = None
    content_url_videos: Optional[str] | None = None
    summary: Optional[str]
    reading_time_min: Optional[int] = None
    difficulty_level: int = None
