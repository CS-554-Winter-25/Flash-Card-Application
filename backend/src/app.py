from flask import Flask, jsonify
from flask_cors import CORS
from src.models import db
from src.routes import api
from sqlalchemy import event
from flask_session import Session

app = Flask(__name__)
app.config.from_prefixed_env()
app.config["SESSION_SQLALCHEMY"] = db
app.config['SESSION_COOKIE_HTTPONLY'] = False

db.init_app(app)
api.init_app(app)
Session(app)
CORS(app, origins=['http://127.0.0.1:5173'], supports_credentials=True)

with app.app_context():
    @event.listens_for(db.engine, "connect")
    def _set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
    db.create_all()


@app.route('/message', methods=['GET'])
def hello():
    return jsonify({"message": "Flashcards Main Menu"})


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
