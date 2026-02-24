from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.schemas.study_material import StudyMaterialResponse
from app.services.study_material_service import StudyMaterialService
from app.dependencies import get_supabase_client

router = APIRouter(prefix="/api/study-materials", tags=["Study Materials"])


@router.get("/topic/{topic_code}", response_model=List[StudyMaterialResponse])
async def get_materials_by_topic(
    topic_code: str,
    current_user: dict = Depends(get_current_user),
    supabase = Depends(get_supabase_client),
):

    service = StudyMaterialService(supabase)
    return await service.get_materials_by_topic(
        topic_code=topic_code,
        user_id=current_user["id"]
    )


@router.get("/{material_id}", response_model=StudyMaterialResponse)
async def get_material_by_id(
    material_id: UUID,
    current_user: dict = Depends(get_current_user),
    supabase = Depends(get_supabase_client),
):
    service = StudyMaterialService(supabase)
    return await service.get_material_by_id(
        material_id=material_id,
        user_id=current_user["id"]
    )