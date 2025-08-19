# Simple Music Player 🎵

A full-stack MERN web application that allows users to upload, store, and play music files securely. Built with MongoDB, Express.js, React, Node.js, and styled with Tailwind CSS.

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT tokens
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Persistent sessions with localStorage

### 🎵 Music Management
- Upload MP3 files (max 10MB per file)
- Store music files securely in MongoDB GridFS
- Display music metadata (title, artist, duration)
- Delete uploaded tracks with confirmation
- Real-time music list updates

### 🎧 Audio Player
- Modern, responsive audio player with Heroicons
- Play, pause, next, and previous controls
- Volume control with persistent settings
- Seek bar for track navigation
- Auto-play next track functionality
- Cross-browser audio streaming

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Fully responsive layout (desktop, tablet, mobile)
- Dark theme with blue accent colors
- Loading states and error handling
- User-friendly feedback messages

## 🏗️ Project Structure

```
simple-music-player/
├── client/                          # React frontend (Vite)
│   ├── src/                         # React source code
│   │   ├── assets/                  # Static assets
│   │   │   └── favicon.svg          # App favicon
│   │   ├── components/              # Reusable React components
│   │   │   ├── AudioPlayer.jsx      # Audio player with controls
│   │   │   ├── Footer.jsx           # App footer
│   │   │   ├── LoginForm.jsx        # Login form component
│   │   │   ├── MusicList.jsx        # Music tracks list
│   │   │   ├── MusicUpload.jsx      # File upload form
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── RegisterForm.jsx     # Registration form
│   │   ├── context/                 # React context providers
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── PlayerContext.jsx    # Audio player state
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Player.jsx           # Main player page
│   │   │   └── Register.jsx         # Registration page
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   ├── .eslintrc.json               # ESLint configuration
│   ├── .prettierrc                  # Prettier configuration
│   └── index.html                   # HTML entry point
├── server/                          # Node.js/Express backend
│   ├── config/                      # Configuration files
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/                 # Route handlers
│   │   ├── authController.js        # Authentication logic
│   │   └── musicController.js       # Music management logic
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                  # JWT authentication
│   │   ├── errorHandler.js          # Error handling
│   │   └── upload.js                # File upload (Multer + GridFS)
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js                  # User model
│   │   └── Music.js                 # Music model
│   ├── routes/                      # API routes
│   │   ├── auth.js                  # Authentication routes
│   │   └── music.js                 # Music management routes
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Main server file
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore file
```

## 🚀 Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas)

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd simple-music-player
```

### 2. Backend Setup

#### Navigate to server directory:
```bash
cd server
```

#### Install dependencies:
```bash
npm install --legacy-peer-deps
```
> **Note:** Use `--legacy-peer-deps` to resolve dependency conflicts between multer versions.

#### Create environment file:
```bash
cp .env.example .env
```

#### Configure environment variables:
Edit `server/.env` with your values:
```env
MONGO_URI=mongodb://localhost:27017/simple-music-player
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

#### Start the backend server:
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

### 3. Frontend Setup

#### Navigate to client directory:
```bash
cd ../client
```

#### Install dependencies:
```bash
npm install
```

#### Start the development server:
```bash
npm run dev
```

## 🌐 Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

## 📖 Usage Guide

### 1. Authentication
- Visit the app and click "Register" to create an account
- Or click "Login" if you already have an account
- Enter your credentials and submit

### 2. Upload Music
- Navigate to the Player page
- Use the upload form to add MP3 files
- Fill in title and artist (optional)
- File size limit: 10MB per file

### 3. Play Music
- View your uploaded tracks in the music list
- Click "Play" on any track to start playback
- Use the audio player controls:
  - ⏮ Previous track
  - ▶️ Play/Pause
  - ⏭ Next track
  - 🔊 Volume control
  - ⏱️ Seek bar

### 4. Manage Music
- Delete tracks using the "Delete" button
- Confirm deletion when prompted
- Tracks are permanently removed from GridFS

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register new user |
| `POST` | `/login` | Login user |
| `GET` | `/me` | Get current user (protected) |

### Music Routes (`/api/music`) - All Protected
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload MP3 file |
| `GET` | `/` | List user's music |
| `GET` | `/:id` | Stream music file |
| `DELETE` | `/:id` | Delete music file |

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **GridFS** - File storage system
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 🔧 Troubleshooting

### Common Issues

#### 1. Dependency Installation Errors
```bash
# If you get peer dependency conflicts:
npm install --legacy-peer-deps
```

#### 2. MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check your `MONGO_URI` in `.env`
- For Atlas: Use connection string from MongoDB Atlas dashboard

#### 3. Port Already in Use
```bash
# Change port in .env file:
PORT=5001
```

#### 4. File Upload Errors
- Ensure file is MP3 format
- Check file size (max 10MB)
- Verify network connection

#### 5. Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET in .env
- Ensure backend is running

### Development Tips

#### Backend Development
```bash
# Run with nodemon for auto-reload:
npm run dev

# Check logs:
npm start
```

#### Frontend Development
```bash
# Vite hot reload is enabled by default
npm run dev

# Build for production:
npm run build
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with the MERN stack
- Icons from Heroicons
- Styled with Tailwind CSS
- File storage with MongoDB GridFS

---

**Project UUID:** `f7a9b3e2-9c1b-4d5a-8f7e-2b3d9e6c4f1a`

**Happy Coding! 🎵✨** 
NODE_ENV=development
MONGO_URI from atlas=mongodb+srv://admin:TJXmoIRibSnNj02H@cluster1.4ksa3pu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1