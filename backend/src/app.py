from flask import Flask, jsonify, session, redirect
from flask_cors import CORS
from src.models import db
from src.routes import api
from sqlalchemy import event
from flask_oauthlib.client import OAuth
from oauth_config import client_id, client_secret, authorization_base_url, token_url


app = Flask(__name__)
app.config["SESSION_SQLALCHEMY"] = db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
api.init_app(app)
CORS(app)


oauth = OAuth(app)

google = oauth.register(
    name = 'google',
    client_id = client_id,
    client_secret = client_secret,
    request_token_params={'scope': 'email'},
    request_token_url=None,
    access_token_method='POST',
    access_token_url=token_url,
    authorize_url=authorization_base_url)

with app.app_context():
    @event.listens_for(db.engine, "connect")
    def _set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
    db.create_all()


@app.route('/message', methods=['GET'])
def hello():
    if 'token' in session:
        return jsonify({"message": "Flashcards Main Menu"})
    return jsonify({"message": "Please login to access the Flashcards app"})

@app.route('/login/google')
def login_google():
    try:
        redirect_uri = url_for('authorize_google', _external=True)
        return google.authorize_redirect(redirect_uri)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

@app.route('/logout')
def logout():
    session.pop('token', None)
    return redirect(url_for('hello'))

@app.route('/authorize/google')
def authorize_google():
    token = google.authorize_access_token()
    userinfo = google.server_metadata.get('userinfo_endpoint')
    resp = google.get('userinfo')
    user_info = resp.json()
    username = user_info['email']

    session['username'] = username
    session['oauth_token'] = token

    if resp is None or token is None:
        return jsonify({"Access denied": resp.get('error')}, resp.get('error_description'))
    return redirect(url_for('hello'))

if __name__ == '__main__':
    app.run(debug=True)
