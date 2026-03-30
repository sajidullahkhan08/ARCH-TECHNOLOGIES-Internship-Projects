# TaskMaster — To-Do List App

A full-featured task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **CRUD Operations:** Create, read, update, and delete tasks
- **Priority Levels:** Low, medium, and high priority with color indicators
- **Categories:** Organize tasks by custom categories
- **Due Dates:** Set deadlines and see overdue indicators
- **Filtering & Sorting:** Filter by status, priority, category; sort by date, title, etc.
- **Statistics Dashboard:** Track total, completed, pending, and high-priority tasks with completion rate
- **Smooth Animations:** Framer Motion transitions and micro-interactions
- **Toast Notifications:** Real-time feedback via react-hot-toast

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Framer Motion, React Icons, date-fns |
| Backend | Express.js, Mongoose, express-validator |
| Database | MongoDB |
| Styling | Vanilla CSS |

## Setup

### Prerequisites
- Node.js 14+
- MongoDB running locally or a MongoDB Atlas URI

### Backend
```bash
cd backend
cp .env.example .env   # Edit with your MongoDB URI
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos (supports query filters) |
| GET | /api/todos/stats/summary | Get task statistics |
| GET | /api/todos/:id | Get single todo |
| POST | /api/todos | Create new todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |
| PATCH | /api/todos/:id/toggle | Toggle completion status |

## License
MIT
