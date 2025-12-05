package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Task represents a to-do item
type Task struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	IsCompleted bool      `json:"is_completed"`
	DueDate     time.Time `json:"due_date"`
}

// tasks simulates a database
var tasks = []Task{
	{ID: "1", Title: "Learn Go", IsCompleted: false, DueDate: time.Now().Add(24 * time.Hour)},
	{ID: "2", Title: "Build an API", IsCompleted: false, DueDate: time.Now().Add(48 * time.Hour)},
}

func main() {
	fmt.Println("Server starting on port 8080...")
	
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Todo API!")
	})

	http.HandleFunc("/tasks", handleTasks)
	http.HandleFunc("GET /tasks/{id}", getTask)
	http.HandleFunc("DELETE /tasks/{id}", deleteTask)

	http.ListenAndServe(":8080", corsMiddleware(http.DefaultServeMux))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func handleTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "GET" {
		json.NewEncoder(w).Encode(tasks)
		return
	}

	if r.Method == "POST" {
		var newTask Task
		_ = json.NewDecoder(r.Body).Decode(&newTask)
		newTask.ID = fmt.Sprintf("%d", len(tasks)+1) // Simple ID generation
		tasks = append(tasks, newTask)
		json.NewEncoder(w).Encode(newTask)
		return
	}
}

func getTask(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	for _, task := range tasks {
		if task.ID == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(task)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	http.Error(w, "Task not found", http.StatusNotFound)
}
