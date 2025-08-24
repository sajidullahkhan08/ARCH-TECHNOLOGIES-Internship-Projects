# ✨ TaskMaster - Beautiful Todo List Application

A modern, responsive, and feature-rich todo list application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **Beautiful UI/UX**: Modern design with smooth animations and intuitive interface
- **Task Management**: Add, edit, delete, and toggle completion status
- **Priority Levels**: Set tasks as low, medium, or high priority
- **Categories**: Organize tasks with custom categories
- **Due Dates**: Set deadlines with overdue notifications
- **Advanced Filtering**: Filter by status, priority, category, and sort options
- **Statistics Dashboard**: Real-time progress tracking and completion rates
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant feedback with toast notifications
- **Search & Sort**: Multiple sorting options and filtering capabilities

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Date-fns** - Date manipulation

## 📁 Project Structure

```
to-do-List-app/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoForm.css
│   │   │   ├── TodoList.js
│   │   │   ├── TodoList.css
│   │   │   ├── TodoItem.js
│   │   │   ├── TodoItem.css
│   │   │   ├── TodoStats.js
│   │   │   ├── TodoStats.css
│   │   │   ├── TodoFilter.js
│   │   │   └── TodoFilter.css
│   │   ├── services/
│   │   │   └── todoService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-List-app
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will open on `http://localhost:3000`

## 📖 API Endpoints

### Todos
- `GET /api/todos` - Get all todos (with optional query parameters)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

### Statistics
- `GET /api/todos/stats/summary` - Get todo statistics

### Query Parameters
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `category` - Filter by category
- `sortBy` - Sort by field (createdAt, updatedAt, title, priority, dueDate)
- `sortOrder` - Sort order (asc/desc)

## 🎨 Features in Detail

### Task Management
- **Add Tasks**: Quick add with expandable form for additional details
- **Edit Tasks**: Inline editing with form validation
- **Delete Tasks**: One-click deletion with confirmation
- **Toggle Completion**: Mark tasks as complete/incomplete

### Priority System
- **Visual Indicators**: Color-coded priority levels
- **Priority Icons**: Emoji indicators for quick recognition
- **Filter by Priority**: Focus on high-priority tasks

### Categories
- **Custom Categories**: Create and organize tasks by category
- **Category Filtering**: Filter tasks by specific categories
- **Category Management**: Easy category assignment and editing

### Due Dates
- **DateTime Selection**: Set specific due dates and times
- **Overdue Detection**: Visual indicators for overdue tasks
- **Date Formatting**: Human-readable date displays

### Statistics Dashboard
- **Real-time Stats**: Live updates of task statistics
- **Progress Tracking**: Completion rate with visual progress bar
- **Task Counts**: Total, completed, pending, and high-priority counts

### Advanced Filtering
- **Status Filtering**: All, pending, or completed tasks
- **Priority Filtering**: Filter by priority level
- **Category Filtering**: Filter by specific categories
- **Sorting Options**: Multiple sorting criteria and directions
- **Active Filter Tags**: Visual representation of active filters

## 🎯 Usage Examples

### Adding a Task
1. Click the "Add New Task" form
2. Enter the task title
3. Click the expand button for additional options
4. Add description, priority, category, and due date
5. Click "Add Task"

### Filtering Tasks
1. Use the sidebar filters to narrow down tasks
2. Select status (All/Pending/Completed)
3. Choose priority level
4. Enter category name
5. Select sorting options
6. Clear filters when needed

### Editing a Task
1. Click the edit icon on any task
2. Modify the task details in the inline form
3. Click save to update or cancel to discard changes

## 🔧 Customization

### Styling
The application uses CSS custom properties and utility classes for easy customization. Main color scheme:
- Primary: `#667eea` to `#764ba2` (gradient)
- Success: `#28a745`
- Warning: `#ffc107`
- Danger: `#dc3545`

### Adding Features
The modular component structure makes it easy to add new features:
- New components can be added to `src/components/`
- API endpoints can be extended in `backend/routes/`
- Database schema can be modified in `backend/models/`

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Use a process manager like PM2
3. Set up MongoDB Atlas or production MongoDB instance
4. Configure CORS for your frontend domain

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Update API base URL in `todoService.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Framer Motion for smooth animations
- React Icons for the beautiful icon set
- MongoDB team for the powerful database

---

**Happy Tasking! 🎉**
