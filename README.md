# Trackerr - Location Tracking System (Backend)

## 🚀 Overview
Trackerr is a **real-time location tracking system** built using **Node.js, Express, MongoDB**, and **Socket.io**. This backend handles user authentication, location tracking, and admin controls, following the **MVC architecture**.

---

## 📂 Project Structure
```
trackerr-backend/
│── db/                # Database Connection
│── models/            # Database Models (MongoDB Schema)
│── controllers/       # Controllers (Business Logic)
│── routes/            # API Routes
│── middlewares/       # Custom Middleware (Error Handling, Auth, etc.)
│── utils/             # Utility Functions
│── public/            # Static Files
│── .env               # Environment Variables
│── app.js             # Express App Configuration
│── index.js           # Main Entry Point
│── package.json       # Dependencies & Scripts
│── README.md          # Documentation
```

---

## 🛠️ Setup & Installation

### 1️⃣ Clone Repository
```sh
git clone https://github.com/your-repo/trackerr-backend.git
cd trackerr-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```ini
PORT=8000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=trackerr
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

### 4️⃣ Start Development Server
```sh
npm run dev
```

---

## 📌 API Endpoints

### **User Authentication** (`/api/auth`)
| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| POST   | /register    | Register a new user |
| POST   | /login       | Login user & get JWT token |

### **Location Tracking** (`/api/location`)
| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| POST   | /            | Send live location  |
| GET    | /live        | Get users' live locations |

### **Admin Routes** (`/api/admin`)
| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| GET    | /users       | Get all registered users |
| GET    | /routes      | View users' travel routes |

---

## 🛡️ Middleware
- **Auth Middleware** (`middlewares/auth.middleware.js`) - Protects private routes using JWT authentication.
- **Error Handling Middleware** (`middlewares/error.middleware.js`) - Manages API errors and sends proper responses.

---

## 🚀 Real-Time Tracking (Socket.io)
This backend integrates **Socket.io** to enable real-time location updates. The **frontend PWA** sends live location updates, and the **admin dashboard** visualizes the users' movement.

---

## 📦 Additional Features
- 📍 **Real-time GPS tracking**
- 🔐 **JWT authentication & role-based access**
- 📊 **Admin dashboard for monitoring users**
- 📂 **Export location data to Excel**
- 📡 **Socket.io integration for live updates**

---

## ❓ Contributing & Support
Feel free to **fork** this repository and contribute by submitting a **pull request**. For issues, create a GitHub **issue**.

---

## 👨‍💻 Author
**Your Name**  
[GitHub](https://github.com/your-profile) • [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it!

