import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private apiUrl =
    'http://127.0.0.1:5001/challenge-atom-447118/us-central1/api';

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

  // Login con Google o Facebook
  socialLogin(token: string): Observable<any> {
    const payload = { token };
    return this.http.post(`${this.apiUrl}/users/social-login`, payload);
  }

  // Login con Google
  loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const token = await result.user.getIdToken();
      return this.http
        .post(`${this.apiUrl}/googleLogin`, { token })
        .toPromise();
    });
  }

  // Login con Facebook
  loginWithFacebook(): Promise<any> {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const token = await result.user.getIdToken();
      return this.http
        .post(`${this.apiUrl}/facebookLogin`, { token })
        .toPromise();
    });
  }

  //Cerrar sesión
  logout(): void {
    sessionStorage.removeItem('userId');
  }
}
