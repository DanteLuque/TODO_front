import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CheckboxModule, ButtonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() completed: boolean = false;

  @Output() toggle = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>(); 

  onToggle() {
    this.toggle.emit();
  }

  onRemove() {
    this.remove.emit();
  }
}
