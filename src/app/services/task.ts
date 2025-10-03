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

  constructor(private http: HttpClient) {}

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
}
