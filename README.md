# Real-Time-Chat-Application - Setup Guide

This guide will help you set up and run the client (Next.js) and server (Express) for the messaging app.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Docker](https://www.docker.com/) (for PostgreSQL)
- [Git](https://git-scm.com/)

## Project Structure
```
/Real-Time-Chat-Application
│── /client   # Next.js frontend
│── /server   # Express backend
└── /database  # PostgreSQL setup (Docker)
```

## Running the Server

### 1. Clone the Repository
```sh
git clone https://github.com/jonahmarc/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application/server
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `/server` directory:
```env
PORT=3001
DATABASE_URL=postgresql://admin:admin@postgres:5432/chatdb
```

### 4. Start PostgreSQL with Docker Compose
```sh
docker compose up -d
```

### 5. Check Running Containers
Ensure the PostgreSQL and server containers are running:
```sh
docker ps
```
If needed, check logs for issues:
```sh
docker logs -f chat-server
```

### 6. Running the Server
The server should start automatically inside the Docker container. If needed, restart it manually:
```sh
docker compose restart server
```
The backend should now be running on `http://localhost:3001`.

## Running the Client

### 1. Navigate to the Client Directory
```sh
cd ../client
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the `/client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Start the Client
```sh
npm run dev
```
The frontend should now be running on `http://localhost:3000`. 🚀