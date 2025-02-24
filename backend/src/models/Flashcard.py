from .db_model import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import UnicodeText, ForeignKey, exc, select


class Flashcard(db.Model):
    __tablename__ = "flashcards"
    id: Mapped[int] = mapped_column(primary_key=True)
    question: Mapped[str] = mapped_column(UnicodeText, nullable=False)
    answer: Mapped[str] = mapped_column(UnicodeText, nullable=False)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"), nullable=False)
    # mapped relations
    topic: Mapped["Topic"] = relationship(back_populates="flashcards")

    @staticmethod
    def find_one(flashcard_id, user_id):
        return db.one_or_404(select(Flashcard).filter(Flashcard.id == flashcard_id, Flashcard.topic.has(user_id = user_id)),
                             description=f"Flashcard with ID {flashcard_id} belonging to user {user_id} not found")

    @staticmethod
    def find_all(user_id):
        return db.session.execute(select(Flashcard).filter(Flashcard.topic.has(user_id))).scalars().all()

    @classmethod
    def create(cls, question, answer, topic_id):
        created_flashcard = cls(question=question, answer=answer, topic_id=topic_id)
        db.session.add(created_flashcard)
        db.session.commit()
        return created_flashcard

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
