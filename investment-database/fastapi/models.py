# models.py

from sqlalchemy import Column, Integer, String, Text, DATETIME
from database import Base

class User(Base):
    __tablename__ = "User"

    UserID = Column(Integer, primary_key=True, index=True)
    UserName = Column(String(255), nullable=False)
    CreatedAt = Column(DATETIME)
    UpdatedAt = Column(DATETIME)