from flask_restx import Resource, Namespace, abort, marshal, fields
from src.models import DbTopic, db
from sqlalchemy import exc
from .auth import user_owns_topic, login_required, user_owns_topic_by_name
from flask import g as request_state

topic_namespace = Namespace("Topic", "routes to handle singular topics")

topic_args_post = topic_namespace.parser()
topic_args_post.add_argument('topic', type=str, required=True)

topic_args_put = topic_args_post.copy()
topic_args_put.add_argument('topic_id', type=int, required=True)
topic_args_put.add_argument('topic', type=str)

topic_args_by_id = topic_namespace.parser()
topic_args_by_id.add_argument('topic_id', type=int, required=True)

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
    method_decorators = [login_required]

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_by_id)
    @user_owns_topic
    def get(self):
        topic_id = topic_args_by_id.parse_args().get('topic_id')
        return DbTopic.find_by_id(topic_id, request_state.user.id)

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_post)
    def post(self):
        topic_body = topic_args_post.parse_args()
        try:
            return DbTopic.create(topic_body.get('topic'), request_state.user.id)
        except exc.IntegrityError:
            abort(400, f"Error creating topic")

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_put)
    @user_owns_topic
    def put(self):
        topic_body = topic_args_put.parse_args()
        try:
            topic = DbTopic.find_by_id(topic_body.get('topic_id'), request_state.user.id)
            topic.update(topic_body.get('topic'))
            return topic
        except exc.IntegrityError:
            abort(400, f"Error updating topic")

    @topic_namespace.expect(topic_args_by_id)
    @user_owns_topic
    def delete(self):
        topic_id = topic_args_by_id.parse_args().get('topic_id')
        topic = DbTopic.find_by_id(topic_id, request_state.user.id)
        topic.delete()
        return 204


@topic_namespace.route('/by-name')
class TopicByName(Resource):
    method_decorators = [login_required]

    @topic_namespace.marshal_with(topic_model)
    @topic_namespace.expect(topic_args_post)
    @user_owns_topic_by_name
    def get(self):
        topic_name = topic_args_post.parse_args().get('topic')
        return DbTopic.find_by_name(topic_name, request_state.user.id)

