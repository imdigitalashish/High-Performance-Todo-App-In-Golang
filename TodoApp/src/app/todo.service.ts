import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, of, retry, retryWhen, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }


  getAllTodo() {
    return this.http.get(`${environment.url}/read`).pipe(
      retryWhen(errors => errors.pipe(delay(3000), take(10))),
      
    ).pipe(catchError(err=> {
      console.log(err)
      return throwError(err)
    }))
  }

}
