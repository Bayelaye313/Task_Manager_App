# Task Management App

A full-stack task management application designed to create, update, and organize tasks efficiently. This project leverages **React** for the frontend, **Node.js** for the backend, and **MongoDB** as the database, with user authentication via **Google OAuth**.

---

## Features

- **Task Management**: Create, edit, delete, and prioritize tasks (low, medium, high).
- **User Authentication**: Secure login using Google OAuth.
- **Responsive UI**: Intuitive design compatible with all screen sizes.
- **Real-Time Updates**: Dynamic task rendering with smooth animations.
- **Filtering Options**: Filter tasks based on priority or completion status.
- **Protected Routes**: Ensure only authenticated users can access the dashboard.

---

## Tech Stack

### Frontend
- **React**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** (for animations)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (via **Mongoose**)

### Authentication
- **Google OAuth 2.0**

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB**
- **npm** or **yarn**

### Clone the Repository
```bash
git clone https://github.com/bayelaye313/task-management-app.git
cd task-management-app
```
---

### Backend Configuration
1- Navigate to the server directory:
    cd backend

2- Create a .env file and fill in the following environment variables:

- PORT=5000
- MONGO_URI=your-mongo-uri
- CLIENT_URL=http://127.0.0.1:5173
- JWT_SECRET=your-jwt-secret
- NODE_ENV=DEVELOPMENT
- USER_EMAIL=your-email@gmail.com
- CLIENT_ID=your-google-client-id
- CLIENT_SECRET=your-google-client-secret
- REFRESH_TOKEN=your-google-refresh-token

3- Install dependencies:
    npm install
4- Start the backend server:
    npm run dev
---

### Frontend Configuration
1- Navigate to the client directory:
    cd ../frontend

2- Install dependencies:
    npm install
3- Start the backend server:
    npm run dev

---

### Usage
- Open the application in your browser:

- Backend: http://localhost:5000
- Frontend: http://127.0.0.1:5173
- Log in using your Google account.

- Start managing your tasks by creating, updating, or deleting tasks on the dashboard.

---
### Project Structure

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── helpers/
│   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
├── README.md
└── .env.example

---

Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.

@Author: Abdoulaye Gueye