from flask_restx import Api
from .Topic import topic_namespace
from .Flashcard import flashcard_namespace
from .Topics import topics_namespace
from .Flashcards import flashcards_namespace
from .auth import auth_namespace

api = Api(
    base_url="api",
    version="1.0.0",
    title="Flash Card Api",
    validate=True,
)

api.add_namespace(topic_namespace, '/topic')
api.add_namespace(flashcard_namespace, '/flashcard')
api.add_namespace(flashcards_namespace, '/flashcards')
api.add_namespace(topics_namespace, '/topics')
api.add_namespace(auth_namespace, '/auth')


