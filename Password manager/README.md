# Password Manager

A **secure** and **user-friendly** password management application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Tailwind CSS** for styling. This app helps users securely store and manage their login credentials with an intuitive interface.

## 🚀 Purpose
Managing multiple passwords can be challenging. This app provides a **secure** and **efficient** way to store, view, and delete saved passwords while ensuring data protection.

## ✨ Features

- 🔐 **Secure Password Storage** – Store passwords along with website and username details.
- 📝 **View Saved Passwords** – Easily access stored credentials in a structured format.
- ❌ **Delete Passwords** – Remove unnecessary passwords from the list.
- 🎨 **Modern UI** – Clean and responsive design using **Tailwind CSS**.
- ⚡ **Fast & Efficient** – Built with **Vite** for optimal performance.
- 🔑 **Backend with Authentication (Upcoming)** – Secure user authentication with JWT.
- 🧩 **Browser Extension (Planned)** – Auto-fill functionality for seamless password management.

## 🛠️ Technologies Used

### **Frontend**
- **React.js** – Component-based UI development
- **Tailwind CSS** – Modern utility-first CSS framework
- **React Hooks** – For state management and interactivity

### **Backend**
- **Node.js** – JavaScript runtime for server-side logic
- **Express.js** – Lightweight web framework for API routes
- **JWT Authentication (Planned)** – For secure user access

## 📥 Installation Guide

Follow these steps to set up and run the project on your local machine:

### **1. Clone the repository**
```bash
git clone https://github.com/PatelKathan089/Web-Projects.git
cd Web-Projects/Password%20manager
```

### **2. Install frontend dependencies**
```bash
cd client
npm install
npm run dev
```
The frontend will be running on **http://localhost:5173**.

### **3. Install backend dependencies**
```bash
cd server
npm install
npm start
```
The backend API will be running on **http://localhost:3000**.

## 📂 Folder Structure

```
Password manager/
├── client/              # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── App.jsx      # Main application component
│   │   ├── index.css    # Global styles (Tailwind)
│   │   └── main.jsx     # Entry point
│   ├── package.json     # React dependencies
│   └── vite.config.js   # Vite configuration
│
├── server/              # Backend (Node.js + Express + MongoDB)
│   ├── routes/          # API routes
│   ├── config/          # Server configuration
│   ├── index.js         # Server entry point
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
│
└── README.md            # Project documentation
```

## 📌 How to Use

1. **Add a Password**: Enter the website, username, and password, then click "Add" to save it.
2. **View Saved Passwords**: All stored credentials appear in a list.
3. **Delete a Password**: Click the "Delete" button next to any entry to remove it.

## 🔒 Security Considerations
- **Passwords should be encrypted** before storing in the database.
- **JWT Authentication** will be added for user login & data privacy.
- **Environment Variables (.env)** should be used for sensitive data.

## 🤝 Contributing

Contributions are welcome! Feel free to **fork** the repository, make changes, and submit a pull request.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

## 📞 Contact

For any questions or suggestions, feel free to reach out:

📧 Email: kathan.9737283387@gmail.com  
🔗 GitHub: [PatelKathan089](https://github.com/PatelKathan089)
