import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TitulosData } from '../models/titulos-data.model';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {
  private url = 'http://localhost:8080/api/titulos';

  constructor(private http: HttpClient) { }

  getTitulosData(): Observable<TitulosData[]> {
    return this.http.get<TitulosData[]>(`${this.url}`);
  }

}