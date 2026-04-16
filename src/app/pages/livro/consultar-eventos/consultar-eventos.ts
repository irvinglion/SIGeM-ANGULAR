import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type LivroRegistroItem = {
  id: number;
  viatura: string;
  pagina: string;
  odometro: string;
  totalHHGastosPagina: string;
  dataEscrituracao: string;
  selected: boolean;
};

@Component({
  selector: 'app-consultar-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './consultar-eventos.html',
  styleUrls: ['./consultar-eventos.css']
})
export class ConsultarEventosComponent {
  viaturaFiltro = '';

  readonly registros: LivroRegistroItem[] = [
    {
      id: 1,
      viatura: 'CFN 44311552',
      pagina: '001',
      odometro: '117547',
      totalHHGastosPagina: '0',
      dataEscrituracao: '08/02/2018 11:42:08',
      selected: false
    },
    {
      id: 2,
      viatura: 'CFN 531323000078',
      pagina: '001',
      odometro: '15349',
      totalHHGastosPagina: '0',
      dataEscrituracao: '19/02/2018 15:29:24',
      selected: false
    },
    {
      id: 3,
      viatura: 'CFN 411323000060',
      pagina: '001',
      odometro: '33761',
      totalHHGastosPagina: '0',
      dataEscrituracao: '28/02/2018 10:35:46',
      selected: false
    }
  ];

  readonly emptyRows = Array.from({ length: 10 });

  get selectedRegistros(): LivroRegistroItem[] {
    return this.registros.filter((registro) => registro.selected);
  }

  get selectedCount(): number {
    return this.selectedRegistros.length;
  }

  get hasSelection(): boolean {
    return this.selectedCount > 0;
  }

  get selectionTitle(): string {
    if (!this.hasSelection) {
      return 'Nenhum elemento selecionado';
    }

    if (this.selectedCount === 1) {
      return '1 escrituração pronta para abrir';
    }

    return `${this.selectedCount} escriturações selecionadas`;
  }

  get selectionDescription(): string {
    if (!this.hasSelection) {
      return 'Marque uma ou mais linhas da tabela para acompanhar rapidamente as viaturas escolhidas.';
    }

    if (this.selectedCount === 1) {
      const [registro] = this.selectedRegistros;
      return `A viatura ${registro.viatura} foi destacada e já está pronta para consulta detalhada.`;
    }

    return 'As viaturas marcadas aparecem abaixo para facilitar conferência antes de abrir os detalhes.';
  }

  get latestSelectionLabel(): string {
    if (!this.hasSelection) {
      return '';
    }

    return this.selectedRegistros[this.selectedRegistros.length - 1].viatura;
  }

  get filteredRegistros(): LivroRegistroItem[] {
    const filtro = this.viaturaFiltro.trim().toLowerCase();
    return this.registros.filter((registro) => !filtro || registro.viatura.toLowerCase().includes(filtro));
  }

  clearFilters(): void {
    this.viaturaFiltro = '';
  }
}
