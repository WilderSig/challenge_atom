import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //  private apiUrl =
  //  'http://127.0.0.1:5001/challenge-atom-447118/us-central1/api';
  private apiUrl =
    'https://us-central1-challenge-atom-447118.cloudfunctions.net/api';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas de un usuario
  getTasks(userId: string): Observable<any[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Task[]>(`${this.apiUrl}/todolist`, { params });
  }

  // Crear una nueva tarea
  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/todolist`, task);
  }

  // Actualizar una tarea
  updateTask(taskId: string, updatedTask: Partial<Task>): Observable<any> {
    return this.http.put(`${this.apiUrl}/todolist/${taskId}`, updatedTask);
  }
  // Eliminar una tarea
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todolist/${taskId}`);
  }
}
