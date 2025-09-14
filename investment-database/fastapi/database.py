# database.py

import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get database URL from environment variable for security
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql+asyncpg://postgres:Pete1474@localhost/investment")

engine = create_async_engine(DATABASE_URL, echo=True)
Base = declarative_base()

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_session():
    async with async_session() as session:
        yield session