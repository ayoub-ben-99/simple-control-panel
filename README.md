# Simple Dashboard Project

## Overview

This is a simple dashboard project built using **Node.js, Express.js, React, and MongoDB (Mongoose)**. It provides a backend interface for handling data and a frontend interface for efficient content management.

## Features

- CRUD operations for managing data
- Environment variables management with dotenv
- Routing with react-router-dom
- API requests handled using Axios
- Modern and stylish UI design

## Tech Stack

### **Backend:**

- **Node.js** - Server runtime
- **Express.js** - Backend framework
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **colors** - Terminal text styling
- **cors** - Cross-origin resource sharing
- **multer** - File uploading middleware
- **date-fns** - Date utilities

### **Frontend:**

- **React** - Frontend library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP request handling
- **Prop-types** - Type validation for components
- **date-fns** - Date formatting utilities

## Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/your-username/simple-dashboard.git
cd simple-dashboard
```

### **2. Backend Setup**

```sh
cd backend
npm install
```

#### Create a `.env` file in the `backend` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
UPLOADS_PATH=uploads/
```

#### Run the backend server:

```sh
npm start
```

### **3. Frontend Setup**

```sh
cd frontend
npm install
npm start
```

## **API Routes**

| Method | Route                   | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/api/users`            | Get all users     |
| POST   | `/api/user/add`         | Create a new user |
| GET    | `/api/users/view/:id`   | Get user by ID    |
| PUT    | `/api/users/update/:id` | Update user by ID |
| DELETE | `/api/users/delete/:id` | Delete user       |

## **Screenshots**

### - dark mode

![[dark mode.png]]

### - Light mode
![[Light mode.png]]
---

### **Contributors**

- ayoub yeager
- Feel free to contribute by submitting Pull Requests! 🚀
