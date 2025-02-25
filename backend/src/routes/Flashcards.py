from flask_restx import Resource, Namespace, abort, Model, fields
from flask import g as request_state
from src.models import DbFlashcard
from .auth import login_required

flashcards_namespace = Namespace('Flashcards', "routes to handle flashcards resources")


flashcard_model = flashcards_namespace.model('Flashcard', {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String,
})


@flashcards_namespace.route('/')
class Flashcard(Resource):
    method_decorators = [login_required]

    @flashcards_namespace.marshal_with(flashcard_model)
    def get(self):
        return DbFlashcard.find_all(request_state.user.id)

