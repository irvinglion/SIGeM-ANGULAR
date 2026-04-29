import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

type ModeloGenericoRegistro = {
  sigla: string;
  descricao: string;
};

@Component({
  selector: 'app-modelo-generico-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelo-generico-lista.html',
  styleUrls: ['./modelo-generico-lista.css']
})
export class ModeloGenericoListaComponent {
  registros: ModeloGenericoRegistro[] = [];

  descricao = '';
  sigla = '';
  showActionButtons = false;
  showAdvancedFilters = false;

  constructor(private readonly mockDb: MockDatabaseService) {
    this.mockDb.getModelosViatura().subscribe((modelos) => {
      const unicos = new Map<string, ModeloGenericoRegistro>();
      modelos.forEach((modelo) => {
        unicos.set(modelo.modeloGenerico, {
          sigla: modelo.modeloGenerico,
          descricao: modelo.nomenclatura
        });
      });
      this.registros = Array.from(unicos.values());
    });
  }

  get filteredRegistros(): ModeloGenericoRegistro[] {
    const descricao = this.descricao.trim().toLowerCase();
    const sigla = this.sigla.trim().toLowerCase();

    return this.registros.filter((registro) => {
      const matchDescricao = !descricao || registro.descricao.toLowerCase().includes(descricao);
      const matchSigla = !sigla || registro.sigla.toLowerCase().includes(sigla);
      return matchDescricao && matchSigla;
    });
  }

  clearFilters(): void {
    this.descricao = '';
    this.sigla = '';
  }

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  toggleAdvancedFilters(event?: Event): void {
    event?.preventDefault();
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
}
