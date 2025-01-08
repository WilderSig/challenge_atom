import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalRegisterComponent } from '../../components/modal-register/modal-register.component';
import { MatDialog } from '@angular/material/dialog';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  Auth,
  signInWithPopup,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private auth = inject(Auth);

  email = '';
  password = '';
  response: string | null = null;

  // Login con Facebook
  async loginWithFacebook(): Promise<void> {
    try {
      const response = await this.authService.loginWithFacebook();
      console.log('Login Exitoso con Facebook:', response);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      this.response = 'Error al iniciar sesión con Facebook.';
    }
  }
  loginUser() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        sessionStorage.setItem('userId', res.uid);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.response =
          'Tu correo no está registrado. Por favor, inténtalo de nuevo.';
      },
    });
  }

  openRegisterModal(): void {
    this.dialog.open(ModalRegisterComponent, {
      width: '400px',
    });
  }
  async loginWithGoogle(): Promise<void> {
    try {
      const response = await this.authService.loginWithGoogle();
      console.log('Login Exitoso:', response);
      this.router.navigate(['/home']); // Redirige al usuario
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      this.response = 'Error al iniciar sesión con Google.';
    }
  }
}
