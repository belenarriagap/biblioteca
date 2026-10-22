import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'libro-lista',
  imports: [FormsModule],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista implements OnInit, OnDestroy {
  libros: any[] = [];
  filtro: string = '';
  nuevo: Libro = { titulo: '', autor: '', anioPublicacion: 2024, disponible: true };
  mensaje: string = '';
  totalPaginas: number = 0;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargar();
  }

  ngOnDestroy(): void {}

  cargar(): void {
    this.libroService.listar().subscribe((data: any) => {
      this.libros = data;
    });
  }

  buscar(): void {
    var texto = this.filtro.trim();
    if (texto == '') {
      this.cargar();
      return;
    }
    this.libroService.buscarPorTitulo(texto).subscribe(data => this.libros = data);
  }

  guardar(): void {
    let resultado: any;
    if (this.nuevo.titulo == '' || this.nuevo.autor == '') {
      this.mensaje = 'Título y autor son obligatorios';
      return;
    }
    this.libroService.guardar(this.nuevo).subscribe(() => {
      this.mensaje = 'Libro registrado';
      this.nuevo = { titulo: '', autor: '', anioPublicacion: 2024, disponible: true };
      this.cargar();
    });
  }

  eliminar(id: number): void {
    this.libroService.eliminar(id).subscribe(() => this.cargar());
  }
}
