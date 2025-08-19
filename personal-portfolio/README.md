# Personal Portfolio - MERN Stack

A full-stack personal portfolio application built with the MERN stack, featuring an admin panel for content management.

## Features

- **Public Portfolio**: Showcase your professional profile with multiple sections
- **Admin Panel**: Complete content management system
- **Responsive Design**: Optimized for all devices
- **RESTful APIs**: Backend APIs for all portfolio sections
- **Authentication**: Secure admin access with JWT

## Portfolio Sections

- Introduction
- Background (Education & Certifications)
- Projects
- Skills
- Experience
- Testimonials
- Blog/Articles
- Achievements
- Contact Information

## Tech Stack

- **Frontend**: React, CSS3, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **Styling**: CSS Modules & Flexbox/Grid

## Project Structure

```
/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── backend/           # Express.js API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-portfolio
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in backend folder:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
   
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create `.env` file in frontend folder:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   Start the frontend application:
   ```bash
   npm start
   ```

4. **Access the Application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

*Please change these credentials after first login*

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Portfolio Sections
- `GET /api/introduction` - Get introduction
- `PUT /api/introduction` - Update introduction (Admin)
- `GET /api/background` - Get background info
- `PUT /api/background` - Update background (Admin)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

*Similar endpoints exist for all other sections*

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # React development server
```

## Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy using your preferred method (Heroku, Digital Ocean, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your static hosting service
3. Update the API URL in production environment

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [your-email@example.com]