from flask import Flask, jsonify
from flask_cors import CORS
from models.flashcard import get_all_flashcards  



app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"message": "Flashcards Main Menu"})


@app.route('/flashcards', methods=['GET'])
def get_flashcards():
    return jsonify(get_all_flashcards())


if __name__ == '__main__':
    app.run(debug=True)
