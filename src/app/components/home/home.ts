import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Task, TaskService } from '../../services/task';
import { FormComponent } from '../form/form';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputTextModule, ButtonModule, FormComponent, DialogModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  modalVisible = false;
  selectedTask: Task | null = null;

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks();
  }

  openNewTask() {
    this.selectedTask = null;
    this.modalVisible = true;
  }

  openEditTask(task: Task) {
    this.selectedTask = task;
    this.modalVisible = true;
  }

  saveTask(task: Task) {
    if (task.id) {
      this.taskService.updateTask(task.id, task);
    } else {
      this.taskService.addTask(task);
    }
    this.modalVisible = false;
  }
}
