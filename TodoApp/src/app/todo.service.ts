import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, EMPTY, of, retry, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }


  getAllTodo() {
    return this.http.get(`${environment.url}/read`).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
        } else {
        }
        return of([]);
      })
    )
  }

  deleteTodo(task_id:any) {

    return this.http.get(`${environment.url}/delete?todo_id=${task_id}`)

  }

}
