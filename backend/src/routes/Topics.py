from flask_restx import Resource, Namespace, fields
from src.models import db, DbTopic

topics_namespace = Namespace("Topics", "routes relating to 1 to many topics")

topic_model = topics_namespace.model('Topic', {
    'topic': fields.String,
    'id': fields.Integer,
})


@topics_namespace.route('/')
class Topics(Resource):

    @topics_namespace.marshal_list_with(topic_model)
    def get(self):
        return DbTopic.find_all(db.session)

