import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';

  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) { }

  getTasks() {
    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(
        tap((data) => this.tasks.set(data)),
        catchError((err) => {
          console.error('Error fetching tasks', err);
          return of([]);
        })
      )
      .subscribe();
  }

  addTask(task: Task) {
    this.http
      .post<Task>(this.apiUrl, task)
      .pipe(tap((newTask) => this.tasks.update((list) => [...list, newTask])))
      .subscribe();
  }

  getTaskById(id: number) {
    return this.http.get<Task>(`${this.apiUrl}${id}/`);
  }

  updateTask(id: number, task: Task) {
    this.http.put<Task>(`${this.apiUrl}${id}/`, task).pipe(
      tap((updatedTask) => {
        this.tasks.update((list) =>
          list.map((t) => (t.id === id ? updatedTask : t))
        );
      })
    ).subscribe();
  }

  toggleCompleted(task: Task) {
    const updated = { ...task, completed: !task.completed };
    this.updateTask(task.id!, updated);
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}${id}/`).pipe(
      tap(() => {
        this.tasks.update((list) => list.filter((t) => t.id !== id));
      })
    ).subscribe();
  }
}
