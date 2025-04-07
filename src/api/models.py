from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'), nullable=True)
    project: Mapped["Project"] = relationship(back_populates="user")


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }


class Project(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text(), nullable=False)
    in_progress: Mapped[bool] = mapped_column(Boolean(False), nullable=False)

    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "in_progress": self.in_progress
        }


