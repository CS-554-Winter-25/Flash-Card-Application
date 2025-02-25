from flask_restx import Resource, Namespace, fields
from src.models import DbTopic
from flask import g as request_state
from .auth import login_required

topics_namespace = Namespace("Topics", "routes relating to 1 to many topics")

topic_model = topics_namespace.model('Topic', {
    'topic': fields.String,
    'id': fields.Integer,
})


@topics_namespace.route('/')
class Topics(Resource):
    method_decorators = [login_required]

    @topics_namespace.marshal_list_with(topic_model)
    def get(self):
        return DbTopic.find_all(request_state.user.id)


flashcard_model = topics_namespace.model('Flashcard', {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String,
})

loaded_topic_model = topics_namespace.model('Topic', {
    'topic': fields.String,
    'id': fields.Integer,
    'flashcards': fields.List(fields.Nested(flashcard_model))
})


@topics_namespace.route('/loaded')
class TopicsLoaded(Resource):

    @topics_namespace.marshal_list_with(loaded_topic_model)
    def get(self):
        return DbTopic.find_all(request_state.user.id)
