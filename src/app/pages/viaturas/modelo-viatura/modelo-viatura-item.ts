import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

type ModeloViaturaItemRegistro = {
  descricao: string;
  sigla?: string;
  selected: boolean;
};

@Component({
  selector: 'app-modelo-viatura-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelo-viatura-item.html',
  styleUrls: ['./modelo-viatura-item.css']
})
export class ModeloViaturaItemComponent {
  private readonly route = inject(ActivatedRoute);

  readonly currentPath = this.route.snapshot.routeConfig?.path ?? '';
  readonly registros: ModeloViaturaItemRegistro[] = this.buildRegistros(this.currentPath);

  get displayTitle(): string {
    const titles: Record<string, string> = {
      'utilizacao-especifica': 'Utiliza\u00e7\u00e3o Espec\u00edfica',
      tracao: 'Tra\u00e7\u00e3o',
      'numero-de-rodas': 'N\u00famero de Rodas',
      pais: 'Pa\u00eds',
      fotografia: 'Fotografia do Modelo de Viatura'
    };

    return titles[this.currentPath] ?? 'Cadastro';
  }

  get hasSiglaColumn(): boolean {
    return this.registros.some((registro) => !!registro.sigla);
  }

  get valueColumnLabel(): string {
    return this.currentPath === 'pais' ? 'Nome' : 'Descri\u00e7\u00e3o';
  }

  get selectedSummary(): string {
    const selecionados = this.registros.filter((registro) => registro.selected);

    if (selecionados.length === 0) {
      return 'Nenhum elemento selecionado.';
    }

    return selecionados.map((registro) => registro.sigla ?? registro.descricao).join(', ');
  }

  private buildRegistros(path: string): ModeloViaturaItemRegistro[] {
    if (path === 'utilizacao-especifica') {
      return [
        { sigla: 'AC', descricao: 'Anticarro', selected: false },
        { sigla: 'AMB', descricao: 'Ambul\u00e2ncia', selected: false },
        { sigla: 'AMB AUTOCROSS', descricao: 'Ambul\u00e2ncia Resgate', selected: false },
        { sigla: 'AMB UTI', descricao: 'Ambul\u00e2ncia UTI', selected: false },
        { sigla: 'AP F', descricao: 'Apoio de fogo', selected: false },
        { sigla: 'AUTOCROSS', descricao: '?', selected: false },
        { sigla: 'AV-MET', descricao: 'ASTROS', selected: false },
        { sigla: 'BAS', descricao: 'Basculante', selected: false },
        { sigla: 'CARGA AUTOCROSS', descricao: 'Carga', selected: false },
        { sigla: 'CARGO', descricao: 'CARGO', selected: false },
        { sigla: 'CargSec-Porta Container', descricao: 'Carga seca e porta container', selected: false },
        { sigla: 'CAV MEC', descricao: 'Cavalo Mec\u00e2nico', selected: false },
        { sigla: 'CC', descricao: 'Carro de Combate', selected: false },
        { sigla: 'CIST A', descricao: 'Cisterna \u00e1gua', selected: false },
        { sigla: 'CIST C', descricao: 'Cisterna Combust\u00edvel', selected: false }
      ];
    }

    if (path === 'numero-de-rodas') {
      return [
        { descricao: '10', selected: false },
        { descricao: '12', selected: false },
        { descricao: '16', selected: false },
        { descricao: '2', selected: false },
        { descricao: '22', selected: false },
        { descricao: '4', selected: false },
        { descricao: '6', selected: false },
        { descricao: '8', selected: false }
      ];
    }

    if (path === 'tracao') {
      return [
        { descricao: '2x1', selected: false },
        { descricao: '4x2', selected: false },
        { descricao: '4x4', selected: false },
        { descricao: '6x2', selected: false },
        { descricao: '6x4', selected: false },
        { descricao: '6x6', selected: false },
        { descricao: '8x8', selected: false }
      ];
    }

    if (path === 'pais') {
      return [
        { descricao: 'Alemanha', selected: false },
        { descricao: '\u00c1ustria', selected: false },
        { descricao: 'Brasil', selected: false },
        { descricao: 'Cor\u00e9ia do Sul', selected: false },
        { descricao: 'Estados Unidos', selected: false },
        { descricao: 'Estados Unidos - Canada', selected: false },
        { descricao: 'Fran\u00e7a', selected: false },
        { descricao: 'Inglaterra', selected: false },
        { descricao: 'Israel', selected: false },
        { descricao: 'It\u00e1lia', selected: false },
        { descricao: 'Jap\u00e3o', selected: false },
        { descricao: 'Reino Unido', selected: false },
        { descricao: 'Su\u00ed\u00e7a', selected: false }
      ];
    }

    return [];
  }
}
