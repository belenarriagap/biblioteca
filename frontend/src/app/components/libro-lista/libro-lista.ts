import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';

const ANIO_POR_DEFECTO = 2024;

function libroVacio(): Libro {
  return { titulo: '', autor: '', anioPublicacion: ANIO_POR_DEFECTO, disponible: true };
}

@Component({
  selector: 'app-libro-lista',
  imports: [FormsModule],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista implements OnInit {
  private readonly libroService = inject(LibroService);

  libros: Libro[] = [];
  filtro = '';
  nuevo: Libro = libroVacio();
  mensaje = '';

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.libroService.listar().subscribe(data => {
      this.libros = data;
    });
  }

  buscar(): void {
    const texto = this.filtro.trim();
    if (texto === '') {
      this.cargar();
      return;
    }
    this.libroService.buscarPorTitulo(texto).subscribe(data => this.libros = data);
  }

  guardar(): void {
    if (this.nuevo.titulo === '' || this.nuevo.autor === '') {
      this.mensaje = 'Título y autor son obligatorios';
      return;
    }
    this.libroService.guardar(this.nuevo).subscribe(() => {
      this.mensaje = 'Libro registrado';
      this.nuevo = libroVacio();
      this.cargar();
    });
  }

  eliminar(libro: Libro): void {
    if (libro.id === undefined) {
      return;
    }
    this.libroService.eliminar(libro.id).subscribe(() => this.cargar());
  }
}
