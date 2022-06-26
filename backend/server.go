package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

// func main() {
// 	db, err := sql.Open("mysql", "root@tcp(0.0.0.0:3306)/gocrud")
// 	if err != nil {
// 		panic(err.Error())
// 	}

// 	defer db.Close()

// 	insert, err := db.Query(fmt.Sprintf("INSERT INTO todo (task_name, status) VALUES ('%v', '%v')", "ashish", 1))

// 	if err != nil {
// 		panic(err.Error())
// 	}

// 	defer insert.Close()

// 	fmt.Println("INSERT SUCCESSFULL")

// }

func main() {

	r := mux.NewRouter()

	r.HandleFunc("/insert", insertIntoDB).Methods("GET")
	r.HandleFunc("/read", getTodoList).Methods("GET")
	r.HandleFunc("/delete", deleteTodo).Methods("GET")

	log.Fatal(http.ListenAndServe(":4000", r))

}

func returnDatabase() *sql.DB {
	db, err := sql.Open("mysql", "root@tcp(0.0.0.0:3306)/gocrud")
	if err != nil {
		panic(err.Error())
	}
	return db
}

func insertIntoDB(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)
	taskName := r.URL.Query()["taskName"][0]
	taskStatus := 0

	db := returnDatabase()
	defer db.Close()

	insert, err := db.Query(fmt.Sprintf("INSERT INTO todo (task_name, status) VALUES ('%v', %v)", taskName, taskStatus))

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

	m := make(map[string]string, 0)
	m["response"] = "Successfully Added"

	json.NewEncoder(w).Encode(m)
}

func setHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func getTodoList(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)
	db := returnDatabase()
	defer db.Close()
	read, err := db.Query("SELECT * FROM todo;")

	var todos []Todo

	for read.Next() {
		var todo Todo

		if err := read.Scan(&todo.TodoId, &todo.TodoName, &todo.TodoStatus); err != nil {
			json.NewEncoder(w).Encode(todos)
		}

		todos = append(todos, todo)

	}

	if err != nil {
		panic(err.Error())
	}

	defer read.Close()

	json.NewEncoder(w).Encode(todos)

}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)
	db := returnDatabase()

	defer db.Close()

	_, err := db.Query(fmt.Sprintf("DELETE FROM todo WHERE task_id=%v", r.URL.Query()["todo_id"][0]))
	if err != nil {
		panic("Something went wrong")
	}

	response := make(map[string]string)

	response["response"] = "Delete sucessfull"

	json.NewEncoder(w).Encode(response)

}

type Todo struct {
	TodoId     int    `json:"todo_id"`
	TodoName   string `json:"todo_name"`
	TodoStatus int    `json:"todo_status"`
}
