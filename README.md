# Todo API in Go

A simple REST API to manage tasks, built with Go standard library.

## Features

- List all tasks: `GET /tasks`
- Create a task: `POST /tasks`
- Get a task: `GET /tasks/{id}`
- Delete a task: `DELETE /tasks/{id}`

## How to Run

1. Ensure you have Go installed (1.22+).
2. Run the server:
   ```bash
   go run main.go
   ```
3. The server will start on `http://localhost:8080`.

## Examples

**Create a Task:**
```bash
curl -X POST -d '{"title":"Buy milk"}' http://localhost:8080/tasks
```

**List Tasks:**
```bash
curl http://localhost:8080/tasks
```
