from functools import wraps
from flask import session, g, abort, request, redirect
from src.models import DbUser, db, DbTopic, DbFlashcard
from google.oauth2.credentials import Credentials
from googleapiclient import discovery


def get_user_info(credentials: Credentials):
    with discovery.build("oauth2", "v2", credentials=credentials) as user_service:
        return user_service.userinfo().get().execute()


def login_required(func):
    @wraps(func)
    def check(*args, **kwargs):
        if hasattr(g, "user"):
            return func(*args, **kwargs)
        if not ({"credentials", "user"} <= session.keys()):
            return abort(401, "USER IS NOT AUTHENTICATED")
        user_id = session["user"]["id"]
        g.user = DbUser.find_user_by_id(user_id)
        return func(*args, **kwargs)

    return check


def not_logged_in(func):
    @wraps(func)
    def check(*args, **kwargs):
        if "user" in session:
            redirect(request.referrer)
        return func(*args, **kwargs)
    return check


def auth_response_decorator(api):
    def wrap_route(func):
        @api.response(401, "USER NOT AUTHENTICATED")
        @api.response(403, "USER DOES NOT HAVE PERMISSIONS TO COMPLETE OPERATION")
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    return wrap_route


def user_owns_topic(func):
    @wraps(func)
    def check(*args, **kwargs):
        data = request.get_json() if request.is_json else {}
        topic_id = data.get("topic_id", kwargs.get("topic_id", request.args.get("topic_id")))

        if "user" not in session:
            abort(401, "USER MUST BE LOGGED IN")
        if topic_id is None:
            abort(400, "TOPIC ID REQUIRED")

        if not db.session.query(
                db.session.query(DbTopic).filter(
                    DbTopic.id == int(topic_id), DbTopic.user_id == session['user']['id'],
                ).exists()
        ).scalar():
            abort(403, "USER DOES NOT HAVE PERMISSIONS TO COMPLETE OPERATION")
        return func(*args, **kwargs)
    return check


def user_owns_topic_by_name(func):
    @wraps(func)
    def check(*args, **kwargs):
        data = request.get_json() if request.is_json else {}
        topic_name = data.get("topic", kwargs.get("topic", request.args.get("topic")))

        if "user" not in session:
            abort(401, "USER MUST BE LOGGED IN")
        if topic_name is None:
            abort(400, "TOPIC ID REQUIRED")
        if not db.session.query(
                db.session.query(DbTopic).filter(
                    DbTopic.topic == topic_name, DbTopic.user_id == session['user']['id'],
                ).exists()
        ).scalar():
            abort(403, "USER DOES NOT HAVE PERMISSIONS TO COMPLETE OPERATION")
        return func(*args, **kwargs)
    return check


def user_owns_flashcard(func):
    @wraps(func)
    def check(*args, **kwargs):
        data = request.get_json()
        flashcard_id = data.get("flashcard_id", kwargs.get("flashcard_id", request.args.get("flashcard_id")))

        if "user" not in session:
            abort(401, "USER MUST BE LOGGED IN")
        if flashcard_id is None:
            abort(400, "FLASHCARD ID REQUIRED")

        if not db.session.query(
                db.session.query(DbTopic).filter(
                    DbFlashcard.id == int(flashcard_id), DbFlashcard.topic.has(user_id=session['user']['id']),
                ).exists()
        ).scalar():
            abort(403, "USER DOES NOT HAVE PERMISSIONS TO COMPLETE OPERATION")
        return func(*args, **kwargs)
    return check
