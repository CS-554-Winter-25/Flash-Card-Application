from flask_restx import Resource, Namespace, abort, marshal, fields
from src.models import DbTopic, db
from sqlalchemy import exc

topic_namespace = Namespace("Topic", "routes to handle singular topics")

topic_args_post = topic_namespace.parser();
topic_args_post.add_argument('topic', type=str, required=True)

topic_args_put = topic_args_post.copy()
topic_args_put.add_argument('id', type=int, required=True)

topic_args_by_id = topic_namespace.parser()
topic_args_by_id.add_argument('id', type=int, required=True)

flashcard_model = topic_namespace.model('Flashcard', {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String,
    'topic_id': fields.Integer,
})

topic_model = topic_namespace.model('Topic', {
    'id': fields.Integer,
    'topic': fields.String,
    'flashcards': fields.List(fields.Nested(flashcard_model)),
})


@topic_namespace.route('/')
class Topic(Resource):

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_by_id)
    def get(self):
        topic_id = topic_args_by_id.parse_args().get('id')
        return DbTopic.find_one( topic_id)

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_post)
    def post(self):
        topic_body = topic_args_post.parse_args()
        try:
            return DbTopic.create(db.session, topic_body.get('topic'))
        except exc.IntegrityError:
            abort(400, f"Error creating topic")

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_put)
    def put(self):
        topic_body = topic_args_put.parse_args()
        try:
            topic = DbTopic.find_one(topic_body.get('id'))
            topic.update(db.session, topic_body.get('topic'))
            return topic
        except exc.IntegrityError:
            abort(400, f"Error updating topic")

    @topic_namespace.expect(topic_args_by_id)
    def delete(self):
        topic_id = topic_args_by_id.parse_args().get('id')
        topic = DbTopic.find_one(topic_id)
        topic.delete(db.session)
        return 204
