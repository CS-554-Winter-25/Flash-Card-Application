from flask_restx import Resource, Namespace, abort, Model, fields
from src.models import db, DbFlashcard
from sqlalchemy import select, exc

flashcard_namespace = Namespace('Flashcard', "ends to handle singular flashcard resources")

flashcard_args_post = flashcard_namespace.parser();
flashcard_args_post.add_argument('question', type=str, required=True)
flashcard_args_post.add_argument('answer', type=str, required=True)
flashcard_args_post.add_argument('topic_id', type=int, required=True)

flashcard_args_put = flashcard_args_post.copy()
flashcard_args_put.add_argument('id', type=int, required=True)

flashcard_args_by_id = flashcard_namespace.parser()
flashcard_args_by_id.add_argument('id', type=int, required=True)

topic_model = flashcard_namespace.model('Topic', {
    'id': fields.Integer,
    'topic': fields.String,
})

flashcard_model = flashcard_namespace.model('Flashcard', {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String,
    'topic': fields.Nested(topic_model),
})


@flashcard_namespace.route('/')
class Flashcard(Resource):

    @flashcard_namespace.marshal_with(flashcard_model)
    @flashcard_namespace.expect(flashcard_args_by_id)
    def get(self):
        flashcard_id = flashcard_args_by_id.parse_args().get('id')
        return DbFlashcard.find_one(flashcard_id)

    @flashcard_namespace.marshal_with(flashcard_model)
    @flashcard_namespace.expect(flashcard_args_post)
    def post(self):
        flashcard_body = flashcard_args_post.parse_args()
        try:
            return DbFlashcard.create(db.session, flashcard_body.get('question'),
                                      flashcard_body.get('answer'),
                                      flashcard_body.get('topic_id'))
        except exc.IntegrityError:
            abort(400, f"Topic ({flashcard_body.get('topic_id')}) does not exist")

    @flashcard_namespace.marshal_with(flashcard_model)
    @flashcard_namespace.expect(flashcard_args_put)
    def put(self):
        flashcard_body = flashcard_args_put.parse_args()
        try:
            flashcard = DbFlashcard.find_one(flashcard_body.get('id'))
            flashcard.update(db.session, **flashcard_body)
            return flashcard
        except exc.IntegrityError:
            abort(400, f"Topic ({flashcard_body.get('topic_id')}) does not exist")

    @flashcard_namespace.expect(flashcard_args_by_id)
    def delete(self):
        flashcard_id = flashcard_args_by_id.parse_args().get('id')
        flashcard = DbFlashcard.find_one(flashcard_id)
        flashcard.delete(db.session)
        return 204
