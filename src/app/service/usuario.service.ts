import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioData } from '../models/usuario-data.models';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserId(): Observable<UsuarioData> {
    const id = this.authService.getUserId();
    const url = `${environment.apiUrl}/usuarios/${id}`;
    return this.http.get<UsuarioData>(url);
  }

  atualizarUsuario(id: number, body: any): Observable<any> {
    const url = `${environment.apiUrl}/usuarios/${id}`;
    return this.http.put(url, body);
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    const url = `${environment.apiUrl}/usuarios`;
    return this.http.post(url, usuario);
  }

  deletarUsuario(id: number): Observable<any> {
    const url = `${environment.apiUrl}/usuarios/${id}`;
    return this.http.delete(url);
  }
    
}
