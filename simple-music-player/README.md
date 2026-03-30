# Simple Music Player

A full-stack music player built with the MERN stack. Upload, store, and stream MP3 files with a custom audio player interface.

## Features
- **User Authentication:** Register/login with JWT tokens
- **Music Upload:** Upload MP3 files (max 10MB) stored in MongoDB GridFS
- **Audio Streaming:** Stream music directly from the database
- **Custom Player:** Play, pause, previous, next, seek, volume control
- **Track Management:** View your music library, delete tracks
- **Responsive Design:** Tailwind CSS with dark theme

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Express.js, Mongoose, JWT, Multer + GridFS |
| Database | MongoDB (GridFS for file storage) |

## Setup

### Prerequisites
- Node.js 14+
- MongoDB running locally or a MongoDB Atlas URI

### Server
```bash
cd server
cp .env.example .env   # Edit with your MongoDB URI and JWT secret
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:5000`.

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Get current user |
| POST | /api/music/upload | Yes | Upload MP3 file |
| GET | /api/music | Yes | Get user's music list |
| GET | /api/music/stream/:id | Yes | Stream audio (supports ?token= query) |
| DELETE | /api/music/:id | Yes | Delete a track |

## License
MIT