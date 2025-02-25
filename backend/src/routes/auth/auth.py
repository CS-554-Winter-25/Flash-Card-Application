from os import getenv, environ
from src.models import DbUser
from flask_restx import Namespace, Resource, abort, marshal, fields
from flask import session, redirect, request
from google_auth_oauthlib import flow
from google.oauth2.credentials import Credentials
from .auth_utils import get_user_info, login_required, not_logged_in

base_user_fields = {
    "id": fields.String,
    "email": fields.String,
    "name": fields.String,
    "picture": fields.String,
}

environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
SCOPE_BASE = "https://www.googleapis.com/auth/"
client_scopes = [
    f"{SCOPE_BASE}userinfo.email",
    f"{SCOPE_BASE}userinfo.profile",
    "openid",
]
auth_flow = flow.Flow.from_client_config(
    {
        "web": {
            "client_id": getenv("CLIENT_ID"),
            "project_id": getenv("PROJECT_ID"),
            "auth_uri": getenv("AUTH_URI"),
            "token_uri": getenv("TOKEN_URI"),
            "auth_provider_x509_cert_url": getenv("CERT_URL"),
            "client_secret": getenv("CLIENT_SECRET"),
            "redirect_uris": [getenv("REDIRECT")],
        }
    },
    scopes=client_scopes,
)

auth_namespace = Namespace("auth", "auth")


@auth_namespace.route("/login")
class Login(Resource):

    @not_logged_in
    def get(self):

        auth_flow.redirect_uri = getenv("REDIRECT")
        auth_url, state = auth_flow.authorization_url(
            access_type="offline", approval_prompt="force"
        )
        session["auth_state"] = state
        session['next_url'] = request.referrer
        return redirect(auth_url)


@auth_namespace.route("/callback")
class AuthCallback(Resource):
    @not_logged_in
    def get(self):
        if session["auth_state"] != request.args["state"]:
            abort(400, "INVALID STATE PROVIDED IN REQUEST")

        auth_flow.fetch_token(authorization_response=request.url)
        credentials = auth_flow.credentials
        session["credentials"] = {
            "token": credentials.token,
            "refresh_token": credentials.refresh_token,
            "token_uri": credentials.token_uri,
            "client_id": credentials.client_id,
            "client_secret": credentials.client_secret,
            "granted_scopes": credentials.granted_scopes,
        }
        session["user"] = get_user_info(Credentials(**session["credentials"]))
        user = marshal(session['user'], base_user_fields)
        DbUser.upsert(user['email'], user['id'], user['name'], user['picture'])

        return redirect(session.get('next_url', 'http://localhost:5173'))


@auth_namespace.route("/logout")
class Logout(Resource):

    def get(self):
        session.clear()
        return redirect(request.referrer)
