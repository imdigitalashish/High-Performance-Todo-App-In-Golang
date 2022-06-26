import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe(res=>{
      console.log(res);
    })

  }
  title = 'TodoApp';

  
}
