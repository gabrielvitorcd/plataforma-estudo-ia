from fastapi import APIRouter, Depends
from app.schemas.study_material import StudyMaterialCreate
from app.database import get_db_connection
from app.services.study_material_service import create_material_service

router = APIRouter(prefix="/study_material", tags=["Study Material"])

@router.post("/create")
def create_material(payload: StudyMaterialCreate, db=Depends(get_db_connection)):
    new_id = create_material_service(db, payload)
    return {"material_id": new_id}
