from .db_model import db
from typing_extensions import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, select


class User(db.Model):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(500), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    picture: Mapped[str] = mapped_column(String(500), nullable=False)

    # relations
    topics: Mapped[List["Topic"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

    @staticmethod
    def find_user_by_email(email):
        return db.one_or_404(select(User).filter_by(email=email), description=f"No User with email {email} found")

    @staticmethod
    def find_user_by_id(user_id):
        return db.one_or_404(select(User).filter_by(id=user_id), description=f"No User with id {id} found")

    @classmethod
    def create_user(cls, user_id, email, name, picture):
        user = cls(id=user_id, email=email, name=name, picture=picture)
        db.session.add(user)
        db.session.commit()
        return user

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()

    @staticmethod
    def upsert(email, user_id, name, picture):
        user = db.session.execute(select(User).filter_by(id=user_id)).scalar()
        if user is None:
            db.session.add(User(email=email, id=user_id, name=name, picture=picture))
        else:
            user.update(name=name, picture=picture)

    def delete(self):
        db.session.delete(self)
        db.session.commit()
