from http.client import responses

from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.orm import load_only
from pydtmodel import UserResponse
from database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from models import User

app = FastAPI()

@app.get("/")
def home_api():
    return {"hello world"}

@app.get("/users/{user_id}",response_model=UserResponse)
async def read_a_user(user_id: int ,session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).options(load_only(User.UserID, User.UserName)).where(User.UserID == user_id))
    user = result.scalars().first()

    return user
