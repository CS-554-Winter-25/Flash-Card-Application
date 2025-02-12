from flask_restx import Api
from .Topic import topic_namespace
from .Flashcard import flashcard_namespace
from .Topics import topics_namespace

api = Api(
    base_url="api",
    version="1.0.0",
    title="Flash Card Api",
    validate=True,
)

api.add_namespace(topic_namespace, '/topic')
api.add_namespace(flashcard_namespace, '/flashcard')
api.add_namespace(topics_namespace, '/topics')


