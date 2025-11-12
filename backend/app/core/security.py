# app/core/security.py
from typing import Any, Dict

import jwt
from fastapi import Header, HTTPException, status
from jwt import ExpiredSignatureError, InvalidTokenError

from app.core.config import settings


def _decode_supabase_jwt(token: str) -> Dict[str, Any]:
    """Decode Supabase JWT respecting algorithm/audience configuration."""
    if not settings.SUPABASE_JWT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase JWT secret not configured",
        )

    decode_kwargs: Dict[str, Any] = {
        "algorithms": [settings.SUPABASE_ALGORITHM],
        "options": {"verify_exp": True},
    }

    if settings.SUPABASE_AUDIENCE:
        decode_kwargs["audience"] = settings.SUPABASE_AUDIENCE

    return jwt.decode(token, settings.SUPABASE_JWT_SECRET, **decode_kwargs)


async def get_current_user(authorization: str = Header(...)) -> Dict[str, Any]:
    """Validates the Supabase access token sent by the frontend."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Bearer token")

    token = authorization.split(" ", 1)[1]

    try:
        payload = _decode_supabase_jwt(token)
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired") from None
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from None

    return {
        "id": payload.get("sub"),
        "email": payload.get("email"),
        "role": payload.get("role", "authenticated"),
        "access_token": token,
        "claims": payload,
    }
