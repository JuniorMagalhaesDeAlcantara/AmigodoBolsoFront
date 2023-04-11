import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {
  private url = 'http://localhost:8080/api/centrodecustos';

  constructor(private http: HttpClient) { }

  getCentrocustoData(): Observable<CentrocustoData[]> {
    return this.http.get<CentrocustoData[]>(`${this.url}`);
  }

  getCentroCustoPorId(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  criarCentroCusto(descricao: string, observacao: string): Observable<any> {
    const body = {
      descricao: descricao,
      observacao: observacao
    };
    return this.http.post(`${this.url}`, body);
  }

  atualizarCentroCusto(id: number, descricao: string, observacao: string): Observable<any> {
    if (id === undefined) {
      return throwError('ID inválido');
    }
    
    const body = {
      id: id,
      descricao: descricao,
      observacao: observacao
    };
  
    return this.http.put(`${this.url}/${id}`, body);
  }

  removerCentroCusto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}