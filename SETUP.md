# NeuroSync Setup Guide

This project consists of three main components:
1. **React Client** (Frontend) - Port 3000
2. **Node.js Server** (Backend API) - Port 5000
3. **Java Spring Boot Backend** (User Management) - Port 8080

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Java 17 JDK
- Maven 3.8+
- Docker and Docker Compose (optional, for databases)
- MongoDB (or use Docker)
- MySQL (or use Docker)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Start the databases:**
   ```bash
   docker-compose up -d mongo mysql
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Start the Node.js server:**
   ```bash
   cd server
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Start the React client:**
   ```bash
   cd client
   npm start
   ```

6. **Start the Java backend (optional):**
   ```bash
   cd neuro-core
   mvn spring-boot:run
   ```

### Option 2: Manual Setup

1. **Install MongoDB and MySQL locally**

2. **Create server/.env file:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/neurosync
   ```

3. **Follow steps 2-6 from Option 1**

## Access Points

- **React Client:** http://localhost:3000
- **Node.js API:** http://localhost:5000
- **Java Backend API:** http://localhost:8080/api

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `docker-compose up -d mongo`
- Check connection string in `server/.env`

### Port Already in Use
- Change ports in respective configuration files
- React: Create `.env` in `client/` with `PORT=3001`
- Node.js: Change `PORT` in `server/.env`

### Missing Dependencies
- Run `npm install` in both `client/` and `server/` directories
- For Java backend, Maven will download dependencies automatically

## Development

- Client uses React with Tailwind CSS
- Server uses Express.js with MongoDB
- Backend uses Spring Boot with MySQL
- All components support hot-reload in development mode

