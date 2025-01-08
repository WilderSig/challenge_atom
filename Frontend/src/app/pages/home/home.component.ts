import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    HeaderComponent,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showAddTask: boolean = false;

  tasks: Task[] = [
    {
      title: 'Sample Task 1',
      description: 'This is a sample task description.',
      creationDate: new Date(),
      completed: false,
      isEditing: false,
    },
    {
      title: 'Sample Task 2',
      description: 'This is another sample task description.',
      creationDate: new Date(),
      completed: true,
      isEditing: false,
    },
  ];

  newTaskTitle: string = '';
  newTaskDescription: string = '';

  filter: 'all' | 'pending' | 'completed' = 'all';

  get filteredTasks(): Task[] {
    if (this.filter === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }
    if (this.filter === 'completed') {
      return this.tasks.filter((task) => task.completed);
    }
    return this.tasks;
  }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask; // Alterna entre mostrar y ocultar el formulario
  }

  addTask(): void {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      this.tasks.push({
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        creationDate: new Date(),
        completed: false,
        isEditing: false,
      });
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.showAddTask = false;
    }
  }

  editTask(task: Task): void {
    task.isEditing = true;
  }

  saveTask(task: Task, newTitle: string, newDescription: string): void {
    if (newTitle.trim() && newDescription.trim()) {
      task.title = newTitle.trim();
      task.description = newDescription.trim();
      task.isEditing = false;
    }
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  filterTasks(criteria: 'all' | 'pending' | 'completed'): void {
    this.filter = criteria;
  }
}
