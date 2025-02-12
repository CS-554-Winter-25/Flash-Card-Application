from flask import Flask
from flask_cors import CORS
from src.models import db
from src.routes import api

app = Flask(__name__)
app.config["SESSION_SQLALCHEMY"] = db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
api.init_app(app)
CORS(app)

with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
