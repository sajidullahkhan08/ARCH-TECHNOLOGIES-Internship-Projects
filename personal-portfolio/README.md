# Personal Portfolio — CMS-Backed

A dynamic personal portfolio website with a full admin dashboard for managing all content sections. Built with the MERN stack.

## Features
- **Dynamic Content:** All portfolio sections are CMS-managed via API
- **Admin Dashboard:** Protected admin panel to add/edit/delete all content
- **Content Sections:** Introduction, Background, Projects, Skills, Experience, Testimonials, Blog, Achievements, Contact
- **JWT Authentication:** Secure admin login with token-based auth
- **Responsive Design:** Clean vanilla CSS styling

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Axios |
| Backend | Express.js, Mongoose, JWT, bcryptjs |
| Database | MongoDB |

## Setup

### Prerequisites
- Node.js 14+
- MongoDB running locally or a MongoDB Atlas URI

### Backend
```bash
cd backend
cp .env.example .env   # IMPORTANT: Change ADMIN_PASSWORD and JWT_SECRET
npm install
npm run dev
```

> ⚠️ **Security:** The admin account is created from environment variables on first startup. Always set strong `ADMIN_PASSWORD` and `JWT_SECRET` values.

### Frontend
```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/auth/verify | Yes | Verify token |

### Portfolio Content (All GET routes are public, PUT/POST/DELETE require auth)
| Section | GET | PUT/POST | DELETE |
|---------|-----|----------|--------|
| Introduction | GET /api/introduction | PUT /api/introduction | — |
| Background | GET /api/background | PUT /api/background | — |
| Skills | GET /api/skills | PUT /api/skills | — |
| Contact | GET /api/contact | PUT /api/contact | — |
| Projects | GET /api/projects | POST /api/projects, PUT /api/projects/:id | DELETE /api/projects/:id |
| Experience | GET /api/experience | POST /api/experience, PUT /api/experience/:id | DELETE /api/experience/:id |
| Testimonials | GET /api/testimonials | POST /api/testimonials, PUT /api/testimonials/:id | DELETE /api/testimonials/:id |
| Blog | GET /api/blog | POST /api/blog, PUT /api/blog/:id | DELETE /api/blog/:id |
| Achievements | GET /api/achievements | POST /api/achievements, PUT /api/achievements/:id | DELETE /api/achievements/:id |

## License
MIT