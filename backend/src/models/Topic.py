from .db_model import db
from typing_extensions import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import UnicodeText, select


class Topic(db.Model):
    __tablename__ = "topics"
    id: Mapped[int] = mapped_column(primary_key=True)
    topic: Mapped[str] = mapped_column(UnicodeText, nullable=False)
    # mapped relations
    flashcards: Mapped[List["Flashcard"]] = relationship(back_populates="topic", cascade='all, delete-orphan')

    @staticmethod
    def find_one(topic_id):
        return db.one_or_404(select(Topic).filter_by(id=topic_id),
                             description=f"Topic with ID {topic_id} not found")

    @staticmethod
    def find_all(session):
        return session.execute(select(Topic)).scalars().all()

    @classmethod
    def create(cls, session, topic):
        created_topic = cls(topic=topic)
        session.add(created_topic)
        session.commit()
        return created_topic

    def update(self, session, new_topic):
        self.topic = new_topic
        session.commit()

    def delete(self, session):
        session.delete(self)
        session.commit()
