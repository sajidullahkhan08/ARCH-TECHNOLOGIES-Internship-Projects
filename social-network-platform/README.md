# Social Network Platform

A full-stack social networking application with real-time features, built with the MERN stack and Socket.IO.

## Features
- **User Authentication:** Register/login with JWT, password hashing (bcryptjs)
- **Posts:** Create, edit, delete posts with optional image uploads
- **Social Feed:** See posts from friends and yourself with pagination
- **Like System:** Like/unlike posts with real-time notifications
- **Comments:** Add and view comments on posts
- **Friend System:** Send, accept, decline friend requests; remove friends
- **Real-Time Updates:** Socket.IO for live notifications (new posts, likes, comments, friend requests)
- **User Profiles:** View profiles, update bio and profile picture
- **User Search:** Find other users by username or email
- **Security:** Helmet, CORS, JWT authentication, input validation

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Lucide Icons, Socket.IO Client |
| Backend | Express.js, Mongoose, JWT, Multer, Socket.IO, Helmet, Morgan |
| Database | MongoDB |

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

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Get current user |

### Posts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/posts | Yes | Get feed posts (paginated) |
| POST | /api/posts | Yes | Create post |
| PUT | /api/posts/:id | Yes | Update post |
| DELETE | /api/posts/:id | Yes | Delete post |
| POST | /api/posts/:id/like | Yes | Toggle like |
| POST | /api/posts/:id/comment | Yes | Add comment |
| GET | /api/posts/:id/comments | Yes | Get comments |

### Friends
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/friends/request | Yes | Send friend request |
| PUT | /api/friends/request/:id/accept | Yes | Accept request |
| PUT | /api/friends/request/:id/decline | Yes | Decline request |
| GET | /api/friends/requests | Yes | Get pending requests |
| GET | /api/friends | Yes | Get friends list |
| DELETE | /api/friends/:friendId | Yes | Remove friend |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/users/:id | Yes | Get user profile |
| PUT | /api/users/:id | Yes | Update profile |
| GET | /api/users/search?q= | Yes | Search users |

## Socket.IO Events
| Event | Direction | Description |
|-------|-----------|-------------|
| newPost | Server → Client | Friend created a post |
| newLike | Server → Client | Someone liked your post |
| newComment | Server → Client | New comment on a post |
| friendRequest | Server → Client | Received friend request |
| friendRequestStatus | Server → Client | Friend request accepted/declined |

## License
MIT