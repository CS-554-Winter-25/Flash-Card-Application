from flask_restx import Resource, Namespace, abort, Model, fields
from src.models import db, DbFlashcard

flashcards_namespace = Namespace('Flashcards', "routes to handle flashcards resources")


flashcard_model = flashcards_namespace.model('Flashcard', {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String,
})


@flashcards_namespace.route('/')
class Flashcard(Resource):

    @flashcards_namespace.marshal_with(flashcard_model)
    def get(self):
        return DbFlashcard.find_all()

