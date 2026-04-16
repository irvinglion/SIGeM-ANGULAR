import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type ModeloViaturaNavItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-modelo-viatura',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './modelo-viatura.html',
  styleUrls: ['./modelo-viatura.css']
})
export class ModeloViaturaComponent {
  readonly navItems: ModeloViaturaNavItem[] = [
    { label: 'Modelos de Viatura', path: 'modelos-de-viatura' },
    { label: 'Modelo Gen\u00e9rico', path: 'modelo-generico' },
    { label: 'Fabricante', path: 'fabricante' },
    { label: 'Utiliza\u00e7\u00e3o Espec\u00edfica', path: 'utilizacao-especifica' },
    { label: 'Tra\u00e7\u00e3o', path: 'tracao' },
    { label: 'N\u00famero de Rodas', path: 'numero-de-rodas' },
    { label: 'Pa\u00eds', path: 'pais' },
    { label: 'Fotografia do Modelo de Viatura', path: 'fotografia' }
  ];
}
