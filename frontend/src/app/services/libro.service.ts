import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/libros';

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  buscarPorTitulo(titulo: string): Observable<Libro[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<Libro[]>(`${this.apiUrl}/buscar`, { params });
  }

  guardar(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
