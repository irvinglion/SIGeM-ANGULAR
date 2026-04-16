import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type FabricanteRegistro = {
  nome: string;
  pais: string;
};

@Component({
  selector: 'app-fabricante-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fabricante-lista.html',
  styleUrls: ['./fabricante-lista.css']
})
export class FabricanteListaComponent {
  showActionButtons = false;
  showAdvancedFilters = false;

  readonly registros: FabricanteRegistro[] = [
    { nome: 'CRESUMAR', pais: 'Brasil' },
    { nome: 'CRISTANINI Decontamination Systems', pais: 'Italia' },
    { nome: 'Cummins', pais: 'Estados Unidos' },
    { nome: 'Daimler PUC', pais: 'Austria' },
    { nome: 'DUMBAR', pais: 'Brasil' },
    { nome: 'E.A. da Silva', pais: 'Brasil' },
    { nome: 'EB', pais: 'Brasil' },
    { nome: 'Empretec', pais: 'Brasil' },
    { nome: 'Engesa', pais: 'Brasil' },
    { nome: 'Ergomix', pais: 'Brasil' },
    { nome: 'Fiat Allis', pais: 'Brasil' },
    { nome: 'FIAT AUTOMOVEIS S.A', pais: 'Brasil' },
    { nome: 'FMC', pais: 'Estados Unidos' },
    { nome: 'FORD MOTOR COMPANY', pais: 'Brasil' },
    { nome: 'Fruehauf', pais: 'Brasil' }
  ];

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  toggleAdvancedFilters(event?: Event): void {
    event?.preventDefault();
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
}
