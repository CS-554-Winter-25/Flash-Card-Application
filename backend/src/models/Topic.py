from .db_model import db
from typing_extensions import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import UnicodeText, select, ForeignKey


class Topic(db.Model):
    __tablename__ = "topics"
    id: Mapped[int] = mapped_column(primary_key=True)
    topic: Mapped[str] = mapped_column(UnicodeText, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    # mapped relations
    flashcards: Mapped[List["Flashcard"]] = relationship(back_populates="topic", cascade='all, delete-orphan')
    user: Mapped["User"] = relationship(back_populates="topics")

    @staticmethod
    def find_by_id(topic_id, user_id):
        return db.one_or_404(select(Topic).filter_by(id=topic_id, user_id=user_id),
                             description=f"Topic with ID {topic_id} not found")

    @staticmethod
    def find_by_name(topic_name, user_id):
        return db.one_or_404(select(Topic).filter_by(topic_name=topic_name, user_id=user_id),
                             description=f"Topic with Name {topic_name} not found")

    @staticmethod
    def find_all(user_id):
        return db.session.execute(select(Topic).filter_by(user_id=user_id)).scalars().all()

    @classmethod
    def create(cls, topic, user_id):
        created_topic = cls(topic=topic, user_id=user_id)
        db.session.add(created_topic)
        db.session.commit()
        return created_topic

    def update(self, new_topic):
        self.topic = new_topic
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
