import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  readonly registros: ModeloViaturaRegistro[] = [
    {
      codeq: '0993160006000',
      neb: 'NEB-001',
      nomenclatura: 'Esp 2x1 MCL POL I/H. DAVIDSON',
      modeloGenerico: 'MCL POL Esp'
    },
    {
      codeq: '0993160006002',
      neb: 'NEB-014',
      nomenclatura: 'Esp 2x1 MCL POL ROAD KING FLHTP-I',
      modeloGenerico: 'MCL POL Esp'
    },
    {
      codeq: '0993540003018',
      neb: 'NEB-072',
      nomenclatura: 'VtrBldAnfEsp SL CMDO CLAnf AAV7A1-C',
      modeloGenerico: 'VtrBldAnfEsp SL CMDO'
    },
    {
      codeq: '0998870001000',
      neb: 'NEB-101',
      nomenclatura: 'VtrBldAnfEsp SL TP CLANF AAVP - RAN/RS',
      modeloGenerico: 'VtrBldAnfEsp SL TP'
    },
    {
      codeq: '0998190004000',
      neb: 'NEB-128',
      nomenclatura: 'VtrBldEsp 4x4 POST MET AV-ASTROS',
      modeloGenerico: 'VtrBldEsp POST MET'
    },
    {
      codeq: '0998190001000',
      neb: 'NEB-135',
      nomenclatura: 'VtrBldEsp 6x6 LMU ASTROS AV-LMU',
      modeloGenerico: 'VtrBldEsp LMU'
    }
  ];

  codeq = '';
  nomenclatura = '';
  showAdvancedFilters = false;
  selectedAdvancedFilter = '';

  constructor(private router: Router) {}

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
