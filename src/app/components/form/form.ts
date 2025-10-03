import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Task } from '../../services/task';
import { DialogModule } from 'primeng/dialog';   

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class FormComponent {
  @Input() visible = false;
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Task>();
  @Output() close = new EventEmitter<void>();

  formData: Task = { title: '', description: '', completed: false };

  ngOnChanges() {
    this.formData = this.task ? { ...this.task } : { title: '', description: '', completed: false };
  }

  onSave() {
    this.save.emit(this.formData);
  }

  onClose() {
    this.close.emit();
  }
}
