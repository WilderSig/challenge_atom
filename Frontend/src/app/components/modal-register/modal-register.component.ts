import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './modal-register.component.html',
  styleUrl: './modal-register.component.scss',
})
export class ModalRegisterComponent {
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<ModalRegisterComponent>);

  email: string = '';
  response: string | null = null;

  registerUser(): void {
    if (!this.email) {
      this.response = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    this.authService.register(this.email, 'Usuario Nuevo').subscribe({
      next: () => {
        this.response = 'Usuario registrado exitosamente. ¡Bienvenido!';
        setTimeout(() => this.dialogRef.close(), 2000); // Cierra el modal tras 2 segundos
      },
      error: (err) => {
        this.response = 'Error al registrar el usuario. Inténtalo nuevamente.';
        this.messageClear();
      },
    });
  }
  messageClear() {
    setTimeout(() => {
      this.response = null;
    }, 3000);
  }
  closeModal(): void {
    this.dialogRef.close(); // Cierra el modal manualmente
  }
}
