import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private token='';
  public  userId!: number;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    const body = { email, senha };
    return this.http.post<{ token: string, usuario: { id: number } }>(`${this.apiUrl}/auth`, body).pipe(
      tap(res => {
        this.token = res.token;
        this.userId = res.usuario.id;
      })
    );
  }

  getToken() {
    return this.token;
  }

  getUserId(){
    return this.userId;
  }

  isLoggedIn() {
    return !!this.token;
  }

  logout() {
    this.token = '';
  }
}
