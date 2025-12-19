# Go + React Todo App

A  task management application featuring a RESTful API built with **Go** (Golang) and a simple frontend interface built with **React**.

## 🚀 Features

- **Backend**: Built with Go's standard library (`net/http`).
- **Frontend**: Interactive UI built with React.
- **CRUD Operations**: Create, Read, and Delete tasks.
- **CORS Support**: Configured for seamless communication between frontend and backend.

## 🛠️ Tech Stack

- **Go** 
- **React**
- **CSS** 

## 📋 Prerequisites

- [Go](https://go.dev/dl/) installed on your machine.
- [Node.js](https://nodejs.org/) and npm installed.

## 🏃‍♂️ Getting Started

### 1. Backend Setup (Go)

The backend runs on port `8080`.

1. Navigate to the project root:
   ```bash
   cd todo-api
   ```
2. Run the server:
   ```bash
   go run main.go
   ```
3. The API will be available at `http://localhost:8080`.

### 2. Frontend Setup (React)

The frontend runs on port `3000`.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:3000`.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | List all tasks |
| `POST` | `/tasks` | Create a new task |
| `GET` | `/tasks/{id}` | Get a specific task |
| `DELETE` | `/tasks/{id}` | Delete a task |

### Example Request

**Create a Task:**
```bash
curl -X POST -d '{"title":"Learn Go"}' http://localhost:8080/tasks
```
