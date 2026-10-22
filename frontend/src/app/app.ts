import { Component } from '@angular/core';
import { LibroLista } from './components/libro-lista/libro-lista';

@Component({
  selector: 'app-root',
  imports: [LibroLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly titulo = 'Sistema de Biblioteca';
}
