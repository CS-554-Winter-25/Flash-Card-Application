# Flash-Card-Application
Team Members: Ben Austin, Ben Carlstrom, Felipe Silva, Channer Bok

## About
Our application is a language learning flashcard application uses React for the frontend and Flask for the backend, following the MVC architecture. The Model handles flashcard data and database interactions, the View displays the flashcards through React, and the Controller processes user actions and communicates with the Flask API. React manages the UI, while Flask handles backend logic, ensuring efficient development with a clear separation of concerns.

## Tech Stack & Structure
The project uses Python for the backend and JavaScript (React) for the frontend. Python is a versatile language well-suited for backend development, with the Flask framework being ideal for smaller-scale web applications. React is a widely-used framework for building  frontends, and its API  integrates welkl with a Python backend, ensuring smooth communication between the two.

Below is a tree diagram illustrating the file structure of our project:
```text
Flash-Card-Application/
│
├── backend/
│   └── src/
│       ├── __init__.py
│       ├── models/
│       │   └── ...
│       ├── components.py
│       └── routes/
│           ├── __init__.py
│           └── routes.py
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── app/
│       ├── features/
│       ├── components/
│       ├── hooks/
│       └── utilities/
├── .gitignore
└── README.md
```
