from fastapi import APIRouter, Depends
from app.schemas.study_material import StudyMaterialCreate
from app.database import get_db_connection
from app.services.study_material_service import create_material_service
from app.core.constants import SOURCE_OPTIONS

router = APIRouter(prefix="/study_material", tags=["Study Material"])

@router.post("/create")
def create_material(payload: StudyMaterialCreate, db=Depends(get_db_connection)):
    new_id = create_material_service(db, payload)
    return {"material_id": new_id}

@router.get("/source-options")
def get_source_options():
    return [
        {"value": key, "label": value}
        for key,value in SOURCE_OPTIONS.items()
    ]