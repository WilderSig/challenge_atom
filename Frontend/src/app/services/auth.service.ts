import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl =
  //'http://127.0.0.1:5001/challenge-atom-447118/us-central1/api';
  private apiUrl =
    'https://us-central1-challenge-atom-447118.cloudfunctions.net/api';
  constructor(private http: HttpClient) {}
  private auth = inject(Auth);
  // Crear un nuevo usuario
  register(email: string, displayName: string): Observable<any> {
    const payload = { email, displayName };
    return this.http.post(`${this.apiUrl}/users/register`, payload);
  }

  // Login con correo
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/users/login`, payload);
  }

  // Login con Google
  loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const token = await result.user.getIdToken();
      return lastValueFrom(
        this.http.post(`${this.apiUrl}/users/social-login`, { token })
      );
    });
  }

  // Login con Facebook
  loginWithFacebook(): Promise<any> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const token = await result.user.getIdToken();
      return lastValueFrom(
        this.http.post(`${this.apiUrl}/users/social-login`, { token })
      );
    });
  }
}
