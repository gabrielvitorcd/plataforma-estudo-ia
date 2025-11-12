# app/routers/users.py
from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.services.user_service import sync_user


router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me")
async def me(user=Depends(get_current_user)):
    """Retorna o usuário autenticado."""
    return {
        "id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "access_token": user["access_token"],
    }

@router.post("/sync")
async def sync_user_route(user=Depends(get_current_user)):
    synced_user = sync_user(user)
    return synced_user