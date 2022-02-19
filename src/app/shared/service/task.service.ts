import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from '../dto/task.dto';
import { TaskResponsePageable } from '../model/taskResponsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = new URL('http://localhost:8080/api/task/');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getTasksWithStatus(status: string): Observable<TaskResponsePageable> {
    let url = new URL(this.apiUrl);
    url.searchParams.set('status', status);
    return this.httpClient.get<TaskResponsePageable>(url.toString());
  }

  public postTask(request: TaskDTO): Observable<Task> {
    return this.httpClient.post<Task>(
      this.apiUrl.toString(),
      request,
      this.httpOptions
    );
  }

  public updateTask(request: TaskDTO, id: string): Observable<any> {
    return this.httpClient.put<any>(
      this.apiUrl.toString().concat(id),
      request,
      this.httpOptions
    );
  }

  public deleteTask(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      this.apiUrl.toString().concat(id)
    );
  }
}
