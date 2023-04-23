import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitulosData } from '../models/titulos-data.model';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { CentrosDeCustosSelectData } from '../models/CentrosCustosSelect-data.model';
import { environment } from '../../environments/environment';
import { CentroCustoService } from './centro-custo.service';

@Injectable({
  providedIn: 'root'
})
export class TitulosService {
  private url = 'http://localhost:8080/api/titulos';

  constructor(private http: HttpClient) { }

  getTitulosPorId(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getTitulosData(): Observable<TitulosData[]> {
    return this.http.get<TitulosData[]>(`${this.url}`);
  }

  getCentrosDeCusto(): Observable<CentrocustoData[]> {
    const urlcentro = `${environment.apiUrl}/centrodecustos`;
    return this.http.get<CentrocustoData[]>(urlcentro);
  }

  buscarCentrosDeCustos(): Observable<CentrosDeCustosSelectData[]> {
    return this.http.get<CentrosDeCustosSelectData[]>(`${environment.apiUrl}/centrodecustos`).pipe(
      map((centrosDeCustos: CentrosDeCustosSelectData[]) => centrosDeCustos.map((cdc: CentrosDeCustosSelectData) => ({ id: cdc.id, descricao: cdc.descricao })))
    );
  }
  
  

  criarTitulo(titulo: TitulosData): Observable<TitulosData> {
    return this.http.post<TitulosData>(`${this.url}`, titulo);
  }

  atualizarTitulo(id: number, titulo: TitulosData): Observable<TitulosData> {
    const url = `${this.url}/${id}`;
    return this.http.put<TitulosData>(url, titulo);
  }

  editarTitulo(id: number, dadosTitulo: TitulosData): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, dadosTitulo);
  }
  

  excluirTitulo(id: number): Observable<TitulosData> {
    return this.http.delete<TitulosData>(`${this.url}/${id}`);
  }

  getTitulosPorCentroDeCusto() {
    return this.getTitulosData().pipe(
      map(titulos => {
        const centrosDeCustos: { [descricao: string]: number } = {};
  
        titulos.forEach(titulo => {
          if (titulo.centrosDeCustos) {
            titulo.centrosDeCustos.forEach(centroDeCusto => {
              const descricao = centroDeCusto.descricao;
  
              if (!centrosDeCustos[descricao]) {
                centrosDeCustos[descricao] = 0;
              }
  
              centrosDeCustos[descricao] += titulo.valor;
            });
          }
        });
  
        return centrosDeCustos;
      })
    );
  }
}