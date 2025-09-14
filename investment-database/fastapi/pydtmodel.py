from pydantic import BaseModel
from typing import  Optional
# Pydantic models for request and response validation
class UserResponse(BaseModel):
    UserID: int
    UserName: Optional[str] = None


# class ItemUpdate(BaseModel):
#     name: Optional[str] = None
#     description: Optional[str] = None
#
#
# class ItemOut(BaseModel):
#     id: int
#     name: str
#     description: Optional[str] = None
#
#     class Config:
#         orm_mode = True

