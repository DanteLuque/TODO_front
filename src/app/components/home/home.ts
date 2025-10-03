import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, InputTextModule, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  newTitle = '';
  newDescription = '';

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks(); 
  }

  addTask() {
    if (this.newTitle.trim()) {
      this.taskService.addTask({
        title: this.newTitle,
        description: this.newDescription,
        completed: false
      });
      this.newTitle = '';
      this.newDescription = '';
    }
  }
}
