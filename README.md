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

# Trackerr - Database Schema

## 1. User Table
Stores information about users (both admins and regular users).

| Column Name  | Data Type     | Constraints                                        | Description                        |
|-------------|-------------|--------------------------------------------------|------------------------------------|
| user_id     | UUID        | PRIMARY KEY                                      | Unique identifier for the user    |
| name        | VARCHAR(255)| NOT NULL                                         | Full name of the user             |
| username    | VARCHAR(255)| NOT NULL, UNIQUE                                | Unique username for login         |
| email       | VARCHAR(255)| NOT NULL, UNIQUE                                | User's email address              |
| password    | TEXT        | NOT NULL                                         | Hashed password for authentication |
| role        | ENUM('admin', 'user') | NOT NULL                         | Defines if the user is an admin or regular user |
| mobile_no   | VARCHAR(15) | NULL                                            | User’s mobile number (optional)  |
| created_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                       | Account creation date             |
| updated_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

---

## 2. Location Table
Stores real-time location updates from users.

| Column Name  | Data Type     | Constraints                                        | Description                        |
|-------------|-------------|--------------------------------------------------|------------------------------------|
| location_id | UUID        | PRIMARY KEY                                      | Unique identifier for each location update |
| user_id     | UUID        | FOREIGN KEY REFERENCES user(user_id) ON DELETE CASCADE | Links location to a specific user |
| latitude    | DECIMAL(10, 8) | NOT NULL                                      | Latitude of the user's location   |
| longitude   | DECIMAL(11, 8) | NOT NULL                                      | Longitude of the user's location  |
| timestamp   | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                       | Time when the location was recorded |

---

## 3. Route Table
Stores users' traveled paths (historical routes).

| Column Name  | Data Type     | Constraints                                        | Description                        |
|-------------|-------------|--------------------------------------------------|------------------------------------|
| route_id    | UUID        | PRIMARY KEY                                      | Unique identifier for the route   |
| user_id     | UUID        | FOREIGN KEY REFERENCES user(user_id) ON DELETE CASCADE | Links route to a specific user |
| start_time  | TIMESTAMP   | NOT NULL                                         | Time when the route started       |
| end_time    | TIMESTAMP   | NULL                                            | Time when the route ended (null if still active) |
| coordinates | JSON        | NOT NULL                                        | Stores an array of latitude/longitude pairs |

---

## 4. Admin Table *(Optional)*
If you prefer to keep admins separate, you can add an **Admin Table**, but typically, admins are just part of the **User Table**.

| Column Name  | Data Type     | Constraints                                        | Description                        |
|-------------|-------------|--------------------------------------------------|------------------------------------|
| admin_id    | UUID        | PRIMARY KEY                                      | Unique identifier for the admin   |
| user_id     | UUID        | FOREIGN KEY REFERENCES user(user_id) ON DELETE CASCADE | Links to the user table |
| created_at  | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                       | Account creation date             |

---

## Relationships Summary
- **User → Location** *(One-to-Many)* → A user can have multiple location updates.
- **User → Route** *(One-to-Many)* → A user can have multiple historical routes.
- **User (Admin Role)** can view all locations and routes.




## ❓ Contributing & Support
Feel free to **fork** this repository and contribute by submitting a **pull request**. For issues, create a GitHub **issue**.

---

## 👨‍💻 Author
**Your Name**  
[GitHub](https://github.com/your-profile) • [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it!

