package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server starting on port 8080...")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the Todo API!")
	})
	http.ListenAndServe(":8080", nil)
}
