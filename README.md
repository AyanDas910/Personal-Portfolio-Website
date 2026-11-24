# Simple MERN Portfolio

A beginner-friendly portfolio built with React, Node.js, Express, and MongoDB.

## Requirements
- Node.js 18+
- MongoDB local server or MongoDB Atlas connection string

## 1. Backend setup
Open a terminal in `backend`:

```bash
cd backend
npm install
```

Create `backend/.env` using `.env.example` as a guide:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
```

Start the backend:

```bash
npm run dev
```

API: `http://localhost:5000/api/projects` and `http://localhost:5000/api/contact`

## 2. Frontend setup
Open a second terminal in `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Notes
- The portfolio page works with sample projects even before MongoDB is connected.
- Contact submissions are saved to MongoDB when the database is connected.
- Update your name, email, skills, and project details in `frontend/src/App.jsx`.
