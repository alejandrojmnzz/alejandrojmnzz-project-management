from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship, DeclarativeBase


db = SQLAlchemy()

user_project = db.Table(
    "user_project",
    db.Column("user_id", db.Integer, ForeignKey("user.id"), primary_key=True),
    db.Column("project_id", db.Integer, ForeignKey("project.id"), primary_key=True),
)


class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(255), nullable=True)

    project: Mapped[list['Project']] = relationship(secondary=user_project, back_populates='user')


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "projects": list(map(lambda item: item.serialize(), self.project))    
        }


class Project(db.Model):
    __tablename__ = 'project'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text(), nullable=False)
    in_progress: Mapped[bool] = mapped_column(Boolean(False), nullable=False)

    user: Mapped[list['User']] = relationship(secondary=user_project, back_populates='project')

    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "in_progress": self.in_progress,
            "users": [user.email for user in self.user]
        }


