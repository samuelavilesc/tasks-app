package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Task represents a to-do item
type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	IsCompleted bool   `json:"is_completed"`
}

// tasks simulates a database
var tasks = []Task{
	{ID: "1", Title: "Learn Go", IsCompleted: false},
	{ID: "2", Title: "Build an API", IsCompleted: false},
}

func main() {
	fmt.Println("Server starting on port 8080...")
	
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Todo API!")
	})

	http.HandleFunc("/tasks", getTasks)

	http.ListenAndServe(":8080", nil)
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
