# Trackerr - Location Tracking System

## Overview

Trackerr is a web-based location tracking system that allows users to share their real-time location via a Progressive Web App (PWA) and enables admins to monitor live locations and historical routes using a web dashboard.

## Features

- **Live Location Tracking**: Users can share their real-time location via a PWA.
- **Admin Dashboard**: View live locations and route history on an interactive map.
- **Real-Time Updates**: WebSocket-based location streaming for instant updates.
- **Historical Route Storage**: Stores past routes for analysis.
- **Secure Authentication**: JWT-based authentication for users and admins.
- **Scalable Backend**: Optimized for large-scale tracking with load balancing and database indexing.
- **Offline Support**: Progressive Web App functionality with background sync.

## System Architecture

### **Frontend (React PWA)**

- Provides an interface for users to allow location tracking.
- Displays live location updates for admins.
- Uses Google Maps API / Leaflet.js for visualization.

### **Backend (Node.js with Express)**

- Handles API requests for authentication and location data storage.
- Implements real-time updates using WebSocket (Socket.IO).

### **Database (MongoDB/PostgreSQL)**

- Stores user details, live locations, and historical route data.
- Optimized with indexing and partitioning.

## Data Flow

1. **User Location Tracking**:

   - A user allows location sharing via the browser.
   - The browser sends periodic location updates (latitude, longitude, timestamp) to the backend.

2. **Backend Processing**:

   - Validates and stores the location data in a database.
   - Optionally pushes real-time location updates to admin clients via WebSocket.

3. **Admin Location Monitoring**:

   - Admins use the web dashboard to view live locations on a map.
   - The dashboard fetches or subscribes to real-time location updates.

## Database Schema

### **User Table**

| Field       | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| user\_id    | UUID      | Unique identifier for the user |
| name        | String    | User's name                    |
| email       | String    | User's email                   |
| password    | String    | Hashed password                |
| role        | Enum      | admin or user                  |
| created\_at | Timestamp | Account creation date          |

### **Location Table**

| Field        | Type      | Description                      |
| ------------ | --------- | -------------------------------- |
| location\_id | UUID      | Unique identifier for each entry |
| user\_id     | UUID      | Foreign key referencing user\_id |
| latitude     | Float     | Latitude of the location         |
| longitude    | Float     | Longitude of the location        |
| timestamp    | Timestamp | Time of the location update      |

### **Route Table**

| Field       | Type       | Description                       |
| ----------- | ---------- | --------------------------------- |
| route\_id   | UUID       | Unique identifier for the route   |
| user\_id    | UUID       | Foreign key referencing user\_id  |
| start\_time | Timestamp  | When the route started            |
| end\_time   | Timestamp  | When the route ended              |
| coordinates | JSON/Array | Array of latitude/longitude pairs |

## API Endpoints

### **User Authentication**

- **POST** `/api/auth/register` → Register a new user
- **POST** `/api/auth/login` → Authenticate a user and return a JWT

### **Location Updates**

- **POST** `/api/location` → Accepts location updates (latitude, longitude, timestamp)
- **GET** `/api/location/live` → Retrieves live locations of all users

### **Routes**

- **GET** `/api/routes/:user_id` → Retrieve historical route data for a user

## Real-Time Communication

- Uses **WebSocket (Socket.IO)** to broadcast live location updates to admin clients.
- The admin panel subscribes to updates and displays them on the map.

## Scalability Considerations

### **Database Optimization**

- Index `user_id` in the Location and Route tables for faster lookups.
- Use partitioning for large Location tables (e.g., partition by user or date).

### **Real-Time Updates**

- Use a message broker like **Redis Pub/Sub** for distributing location updates to multiple admin clients.

### **Storage Management**

- Archive older location data into cold storage to save on database costs.

### **Load Balancing**

- Use load balancers to distribute traffic across multiple backend instances.

## Deployment

### **Backend**

- Deploy on **Render / AWS Lambda / DigitalOcean**.
- Database hosted on **MongoDB Atlas / Supabase (PostgreSQL)**.

### **Frontend**

- Deploy PWA on **Vercel / Netlify**.
- Ensure **HTTPS** for location tracking permissions.

## Installation & Setup

### **1. Clone the Repository**

```sh
 git clone https://github.com/your-username/trackerr.git
 cd trackerr
```

### **2. Backend Setup**

```sh
 cd backend
 npm install
 npm start
```

### **3. Frontend Setup**

```sh
 cd frontend
 npm install
 npm run dev
```

## Contributors

- **[Your Name]** - Developer & Maintainer

## License

This project is licensed under the MIT License.

sarvesh shahi
