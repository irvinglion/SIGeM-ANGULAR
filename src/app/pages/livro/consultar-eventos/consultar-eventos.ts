import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { LivroRegistroViatura, MockDatabaseService } from '../../../core/services/mock-database.service';

type LivroRegistroItem = {
  id: string;
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
  registros: LivroRegistroItem[] = [];

  readonly emptyRows = Array.from({ length: 10 });

  constructor(private readonly mockDb: MockDatabaseService) {
    combineLatest([this.mockDb.getLivroRegistroViatura(), this.mockDb.getViaturas()]).subscribe(([registros, viaturas]) => {
      this.registros = registros.map((registro: LivroRegistroViatura) => ({
        id: registro.id,
        viatura: viaturas.find((viatura) => viatura.id === registro.viaturaId)?.numeroRegistro ?? registro.viaturaId,
        pagina: registro.pagina,
        odometro: registro.odometro,
        totalHHGastosPagina: registro.horimetro,
        dataEscrituracao: registro.dataEscrituracao,
        selected: false
      }));
    });
  }

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
      return '1 escrituracao pronta para abrir';
    }

    return `${this.selectedCount} escrituracoes selecionadas`;
  }

  get selectionDescription(): string {
    if (!this.hasSelection) {
      return 'Marque uma ou mais linhas da tabela para acompanhar rapidamente as viaturas escolhidas.';
    }

    if (this.selectedCount === 1) {
      const [registro] = this.selectedRegistros;
      return `A viatura ${registro.viatura} foi destacada e ja esta pronta para consulta detalhada.`;
    }

    return 'As viaturas marcadas aparecem abaixo para facilitar conferencia antes de abrir os detalhes.';
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
