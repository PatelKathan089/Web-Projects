# 🎬 YouTube Clone

A full-stack YouTube clone application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project allows users to create channels, upload videos, watch them, leave comments, and manage their content.

## 🚀 Features

- 🎥 Upload and play videos
- 📺 View channel-specific videos
- 📝 Add, edit, and delete comments
- 📤 Create and manage your own channel
- 🔐 User authentication with secure password storage
- 📁 File upload using **multer**
- 💬 Toast notifications for user feedback
- 🎨 Fully responsive UI with smooth UX

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (for file uploads)
- Bcrypt.js (for password hashing)
- JWT (for authentication)

## 📂 Project Structure

```
Youtube_clone/
├── backend/
│ ├── controllers/
| |
│ ├── models/
| |
│ ├── routes/
| |
| ├── .env
| |
| ├── package.json
| |
│ └── server.js
|
├── src
|    |__ assets
|    |__ components
|    |__ context
|    |__ pages
|    |__ styles
|    |__ App.css
|    |__ App.jsx
|    |__ index.css
|    |__ main.jsx
|
├── .gitignore
|
├── index.html
|
├── package.json
|
├── README.md
|
└── vite.config.js
```

## 💻 Installation & Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/PatelKathan089/Web-Projects.git
cd Web-Projects/Youtube_clone
```

2. **Frontend Setup**

```bash
npm install
npm run dev // Start Frontend server
```

3. **Backend Setup**

```bash
cd backend
npm install
nodemon server.js // Start backend server
```

4. **Environment Variables**

```bash
MONGO_URI = <Your database connection Url>
SECRET_KEY = <Setup key for jwt>
MY_API_KEY = <Your Google api key>
```

## Github Link

[Youtube Clone](https://github.com/PatelKathan089/Web-Projects/tree/master/Youtube_clone)

## 📄 License

This project is licensed under the **MIT License**
