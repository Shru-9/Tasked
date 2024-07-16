import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private apiUrlTask = `${environment.apiUrl}/tasks`;
  private apiUrlUsers = `${environment.apiUrl}/users`;

  constructor(private http:HttpClient) { }
  getallUsers(){
    return this.http.get(this.apiUrlUsers);
  }


  getTasksByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlTask}?UserId=${userId}`);
  }
  // Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTask);
  }

  // Get task by ID
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlTask}/${id}`);
  }

  // Create a new task
  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrlTask, task);
  }

  // Update a task by ID
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlTask}/${id}`, task);
  }

  // Delete a task by ID
  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlTask}/${id}`);
  }
}
