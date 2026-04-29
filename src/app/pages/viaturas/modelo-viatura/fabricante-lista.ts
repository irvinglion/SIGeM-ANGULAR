import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante, MockDatabaseService } from '../../../core/services/mock-database.service';

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

  registros: FabricanteRegistro[] = [];

  constructor(private readonly mockDb: MockDatabaseService) {
    this.mockDb.getFabricantes().subscribe((fabricantes) => {
      this.registros = fabricantes.map((fabricante: Fabricante) => ({
        nome: fabricante.nome,
        pais: fabricante.pais
      }));
    });
  }

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  toggleAdvancedFilters(event?: Event): void {
    event?.preventDefault();
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
}
