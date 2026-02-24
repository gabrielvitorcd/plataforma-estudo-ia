from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class StudyMaterialBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    content_path: Optional[str] = None
    video_url: Optional[str] = None
    pdf_url: Optional[str] = None


class StudyMaterialResponse(StudyMaterialBase):
    id: UUID
    topic_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class StudyMaterialListResponse(BaseModel):
    materials: list[StudyMaterialResponse]
    total: int
    page: int
    page_size: int