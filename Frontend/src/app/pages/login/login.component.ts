import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule } from '@angular/material/card';
import {MatCheckboxModule } from '@angular/material/checkbox';  
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgOptimizedImage,CommonModule, MatIconModule,MatSelectModule,MatCheckboxModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginWithGoogle(): void {
    console.log('Logging in with Google');
  }

  loginWithFacebook(): void {
    console.log('Logging in with Facebook');
  }

  loginWithEmail(email: string): void {
    console.log(`Logging in with email: ${email}`);
  }
}
