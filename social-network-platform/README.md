# Social Network Platform

A complete MERN stack web application for a social network platform, enabling users to create profiles, post content, comment, like posts, send/receive friend requests, and receive real-time updates using WebSockets.

## Features

- **User Authentication**: Register, login, and logout with JWT
- **User Profiles**: Create and edit profiles with bio and profile pictures
- **Posts**: Create, edit, delete posts with text and optional images
- **Comments**: Comment on posts with real-time updates
- **Likes**: Like and unlike posts
- **Friend System**: Send, accept, and decline friend requests
- **Real-time Updates**: WebSocket integration for instant notifications
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Upload**: Multer

## Project Structure

```
social-network-platform/
├── client/                          # React frontend (Vite)
│   ├── public/                      # Static assets
│   ├── src/                         # React source code
│   │   ├── assets/                  # Images, icons, etc.
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page components
│   │   ├── context/                 # React context for auth and socket
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   └── tailwind.config.js           # Tailwind CSS configuration
├── server/                          # Node.js/Express backend
│   ├── config/                      # Configuration files
│   ├── models/                      # MongoDB schemas
│   ├── routes/                      # API routes
│   ├── middleware/                  # Custom middleware
│   ├── controllers/                 # Route handlers
│   ├── uploads/                     # Image uploads folder
│   ├── package.json                 # Backend dependencies
│   ├── server.js                    # Main server file
│   └── .env                         # Environment variables
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/social-network
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get authenticated user details

### Users
- `GET /api/users/:id` - Get user profile by ID
- `PUT /api/users/:id` - Update user profile

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (friends and self)
- `PUT /api/posts/:id` - Edit a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Add a comment to a post
- `GET /api/posts/:id/comments` - Get all comments for a post

### Friends
- `POST /api/friends/request` - Send a friend request
- `PUT /api/friends/request/:id/accept` - Accept a friend request
- `PUT /api/friends/request/:id/decline` - Decline a friend request
- `GET /api/friends/requests` - Get pending friend requests
- `GET /api/friends` - Get list of friends

## WebSocket Events

### Client to Server
- `join` - Join user's room for real-time updates
- `disconnect` - Handle user disconnection

### Server to Client
- `newPost` - New post from friends
- `newComment` - New comment on user's post
- `newLike` - New like on user's post
- `friendRequest` - New friend request
- `friendRequestStatus` - Friend request status update

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Server port (default: 5000)

## Features in Detail

### User Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Persistent sessions with localStorage

### User Profiles
- Editable bio and profile picture
- Friend count display
- User's posts timeline
- Profile picture upload (JPEG/PNG, max 5MB)

### Posts
- Text content (max 500 characters)
- Optional image upload
- Like/unlike functionality
- Comment system
- Real-time updates

### Friend System
- Send friend requests
- Accept/decline requests
- View friends list
- Real-time notifications

### Real-time Updates
- WebSocket integration with Socket.IO
- Authenticated connections
- Event-driven updates
- Efficient broadcasting

## Error Handling

- Input validation on both client and server
- File upload restrictions
- Network error handling
- User-friendly error messages
- Loading states for better UX

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Input sanitization
- File upload validation
- CORS configuration

## Performance Optimizations

- Efficient database queries
- Image optimization
- Lazy loading for posts
- Optimized WebSocket events

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team. 