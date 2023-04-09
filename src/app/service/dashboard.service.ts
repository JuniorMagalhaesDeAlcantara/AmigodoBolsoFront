import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../models/dashboard-data.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8080/api/dashboard?periodoInicial=2023-03-02%2000%3A00%3A00&periodoFinal=2023-03-30%2023%3A59%3A59';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.url}`);
  }

}
