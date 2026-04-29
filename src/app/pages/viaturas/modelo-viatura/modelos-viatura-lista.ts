import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDatabaseService, ModeloViatura } from '../../../core/services/mock-database.service';

type ModeloViaturaRegistro = {
  codeq: string;
  neb: string;
  nomenclatura: string;
  modeloGenerico: string;
};

type FiltroAvancadoItem = {
  label: string;
  hasHierarchy?: boolean;
};

@Component({
  selector: 'app-modelos-viatura-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelos-viatura-lista.html',
  styleUrls: ['./modelos-viatura-lista.css']
})
export class ModelosViaturaListaComponent {
  showActionButtons = false;
  readonly advancedFilterItems: FiltroAvancadoItem[] = [
    { label: 'Ciclo Operativo' },
    { label: 'Classificacao de Viatura', hasHierarchy: true },
    { label: 'Codeq' },
    { label: 'Fabricante', hasHierarchy: true },
    { label: 'Gerencia de Meios', hasHierarchy: true },
    { label: 'Modelo Generico', hasHierarchy: true },
    { label: 'NEB (PI)' },
    { label: 'Nomenclatura' },
    { label: 'Numero de Rodas', hasHierarchy: true },
    { label: 'Sistemas', hasHierarchy: true },
    { label: 'Tipo de equipamento', hasHierarchy: true },
    { label: 'Tracao', hasHierarchy: true },
    { label: 'Utilizacao Especifica', hasHierarchy: true },
    { label: 'Versao' }
  ];

  registros: ModeloViaturaRegistro[] = [];

  codeq = '';
  nomenclatura = '';
  showAdvancedFilters = false;
  selectedAdvancedFilter = '';

  constructor(
    private router: Router,
    private readonly mockDb: MockDatabaseService
  ) {
    this.mockDb.getModelosViatura().subscribe((modelos) => {
      this.registros = modelos.map((modelo: ModeloViatura) => ({
        codeq: modelo.codeq,
        neb: modelo.neb,
        nomenclatura: modelo.nomenclatura,
        modeloGenerico: modelo.modeloGenerico
      }));
    });
  }

  get filteredRegistros(): ModeloViaturaRegistro[] {
    const codeq = this.codeq.trim().toLowerCase();
    const nomenclatura = this.nomenclatura.trim().toLowerCase();

    return this.registros.filter((registro) => {
      const matchesCodeq = !codeq || registro.codeq.toLowerCase().includes(codeq);
      const matchesNomenclatura =
        !nomenclatura || registro.nomenclatura.toLowerCase().includes(nomenclatura);

      return matchesCodeq && matchesNomenclatura;
    });
  }

  clearFilters(): void {
    this.codeq = '';
    this.nomenclatura = '';
    this.selectedAdvancedFilter = '';
  }

  toggleAdvancedFilters(event?: Event): void {
    event?.preventDefault();
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  selectAdvancedFilter(item: string): void {
    this.selectedAdvancedFilter = item;
  }

  goToCadastrarModelo(): void {
    this.router.navigate(['/viaturas/modelo/cadastrar-modelo-viatura']);
  }
}
