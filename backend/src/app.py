from flask import Flask
from flask_cors import CORS
from src.models import db
from src.routes import api
from sqlalchemy import event

app = Flask(__name__)
app.config["SESSION_SQLALCHEMY"] = db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
api.init_app(app)
CORS(app)

with app.app_context():
    @event.listens_for(db.engine, "connect")
    def _set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
