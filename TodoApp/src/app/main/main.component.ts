import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/models/Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-main',
  template: `


    <div class="header">
      <h1>Hi, Ashish</h1>
      <h2 class="taskStatus" *ngIf="todos != null; else elseStatement">{{todos.length}} tasks pending</h2>
          <ng-template #elseStatement> <h2 class="taskStatus">0 tasks pending</h2></ng-template>
      
      <br>

    <div *ngFor="let todo of todos" class="TodoList">
        <p>{{todo.todo_name}}</p>
        <button class="btn btn-danger" (click)="deleteTask(todo.todo_id);">delete</button>

    </div>

    <div class="addTask">
      <input #mytext type="text">
      <button class="btn btn-success" (click)="Submit(mytext);" style="padding: 20px">Add</button>
    </div>

    </div>



  `,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private todoService: TodoService, private http: HttpClient) { }


  todos: Todo[] = [];



  ngOnInit(): void {
    this.getAllTodos();

  }

  Submit(task: any) {
    this.http.get(`${environment.url}/insert?taskName=${task.value}`, { observe: "response" }).subscribe((res: any) => {
      console.log(res.status);
      if (res.status === 200) {
        this.getAllTodos();
        task.value = "";
      } else {
        alert("Something went wrong");
      }
    })

  }

  deleteTask(task_id: any) {

    this.todoService.deleteTodo(task_id).subscribe((res) => {
      this.getAllTodos();
    })


  }


  getAllTodos() {
    this.todoService.getAllTodo().subscribe((res: any) => {
      this.todos = res;
    })

  }


}
