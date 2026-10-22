import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl: string = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  buscarPorTitulo(titulo: string): Observable<Libro[]> {
    let url = this.apiUrl + '/buscar?titulo=' + titulo;
    return this.http.get<Libro[]>(url);
  }

  guardar(libro: any): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
