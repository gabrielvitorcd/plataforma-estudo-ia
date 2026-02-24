# backend/app/services/study_material_service.py
from typing import List, Optional
from uuid import UUID
from fastapi import HTTPException, status
from supabase import Client
from app.schemas.study_material import StudyMaterialResponse



class StudyMaterialService:
    def __init__(self, supabase: Client):
        self.supabase = supabase

    async def get_materials_by_topic(
        self,
        topic_code: str,
        user_id: str,
    ) -> List[StudyMaterialResponse]:

        # print(f"Buscando materiais do tópico: {topic_code} para usuário: {user_id}")

        topic_result = self.supabase.table("topic").select("id").eq("code", topic_code).execute()
        
        if not topic_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Topic '{topic_code}' not found"
            )
        
        topic_id = topic_result.data[0]["id"]
        
        materials_result = (
            self.supabase
            .table("study_material")
            .select("*")
            .eq("topic_id", topic_id)
            .execute()
        )

        # print(materials_result)
        
        materials = [
            StudyMaterialResponse(**material)
            for material in materials_result.data
        ]
        
        return materials

    async def get_material_by_id(
        self,
        material_id: UUID,
        user_id: str,
    ) -> StudyMaterialResponse:
        
        result = (
            self.supabase
            .table("study_material")
            .select("*")
            .eq("id", str(material_id))
            .single()
            .execute()
        )
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Material not found"
            )
        
        return StudyMaterialResponse(**result.data)