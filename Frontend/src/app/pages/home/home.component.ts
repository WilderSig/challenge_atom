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
import { TaskService } from '../../services/tasks/task.service';

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
  private taskService = inject(TaskService);
  userId: string = sessionStorage.getItem('userId') ?? '';
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  filter: 'all' | 'pending' | 'completed' = 'all';

  //cargamos las tareas del usuario
  ngOnInit(): void {
    this.loadTasks();
  }

  // Cargar todas las tareas
  loadTasks(): void {
    this.taskService.getTasks(this.userId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tareas cargadas:', tasks);
      },
      error: (error) => {
        console.error('Error al cargar tareas:', error);
      },
    });
  }
  //filtramos las tareas por lo que el usuario desee.
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

  // Crear una nueva tarea
  addTask(): void {
    const newTask: Task = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      creationDate: new Date(),
      completed: false,
      userId: this.userId,
    };

    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        console.log('Tarea creada:', response);
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.showAddTask = false;
        this.loadTasks(); // Recargar las tareas
      },
      error: (error) => {
        console.error('Error al crear tarea:', error);
      },
    });
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

  // Actualizar una tarea
  updateTask(taskId: string, updatedData: Partial<Task>): void {
    console.log(taskId, updatedData);
    this.taskService.updateTask(taskId, updatedData).subscribe({
      next: () => {
        console.log('Tarea actualizada');
        this.loadTasks(); // Recargar las tareas
      },
      error: (error) => {
        console.error('Error al actualizar tarea:', error);
      },
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Tarea eliminada');
        this.loadTasks(); // Recargar las tareas
      },
      error: (error) => {
        console.error('Error al eliminar tarea:', error);
      },
    });
  }

  filterTasks(criteria: 'all' | 'pending' | 'completed'): void {
    this.filter = criteria;
  }
}
