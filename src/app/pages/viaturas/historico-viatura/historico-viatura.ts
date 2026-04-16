import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ResponsavelHistorico = {
  nome: string;
  funcao: string;
  periodoInicio: string;
  periodoFim: string;
  om: string;
  status: string;
};

type UsoViatura = {
  data: string;
  missao: string;
  origem: string;
  destino: string;
  motorista: string;
};

type ViaturaHistorico = {
  id: number;
  numeroRegistro: string;
  modelo: string;
  omAtual: string;
  ultimoUso: string;
  statusUso: string;
  historicoUso: UsoViatura[];
  historicoEncarregados: ResponsavelHistorico[];
};

@Component({
  selector: 'app-historico-viatura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico-viatura.html',
  styleUrls: ['./historico-viatura.css']
})
export class HistoricoViaturaComponent {
  pesquisa = '';

  readonly viaturas: ViaturaHistorico[] = [
    {
      id: 1,
      numeroRegistro: 'CFN 44311552',
      modelo: 'RBS - VtrTNE 3/4 Ton 4x4 LAND ROVER DEFENDER 110',
      omAtual: '1º Batalhão Logístico',
      ultimoUso: '12/04/2026',
      statusUso: 'Em serviço',
      historicoUso: [
        {
          data: '12/04/2026',
          missao: 'Transporte de material sensível',
          origem: '1º Batalhão Logístico',
          destino: 'Base de Apoio Alfa',
          motorista: 'Cb Henrique Lima'
        },
        {
          data: '28/03/2026',
          missao: 'Apoio administrativo',
          origem: '1º Batalhão Logístico',
          destino: 'Comando Regional',
          motorista: 'Sd Felipe Moura'
        },
        {
          data: '10/03/2026',
          missao: 'Vistoria operacional',
          origem: 'Parque de Viaturas',
          destino: 'Área de Exercício Delta',
          motorista: '3º Sgt Otávio Reis'
        }
      ],
      historicoEncarregados: [
        {
          nome: '1º Sgt Carlos Almeida',
          funcao: 'Encarregado da viatura',
          periodoInicio: '08/02/2018',
          periodoFim: '19/03/2018',
          om: '1º Batalhão Logístico',
          status: 'Encerrado'
        },
        {
          nome: '2º Sgt Marcos Ribeiro',
          funcao: 'Encarregado substituto',
          periodoInicio: '20/03/2018',
          periodoFim: '15/05/2018',
          om: '1º Batalhão Logístico',
          status: 'Encerrado'
        },
        {
          nome: 'Subtenente Paulo Mendes',
          funcao: 'Encarregado atual',
          periodoInicio: '16/05/2018',
          periodoFim: '',
          om: '1º Batalhão Logístico',
          status: 'Ativo'
        }
      ]
    },
    {
      id: 2,
      numeroRegistro: 'CFN 531323000078',
      modelo: 'VtrBldEsp 4x4 POST MET AV-ASTROS',
      omAtual: '2ª Companhia de Artilharia',
      ultimoUso: '08/04/2026',
      statusUso: 'Disponível',
      historicoUso: [
        {
          data: '08/04/2026',
          missao: 'Deslocamento para inspeção',
          origem: '2ª Companhia de Artilharia',
          destino: 'Pátio de Manutenção',
          motorista: 'Cb Matheus Prado'
        },
        {
          data: '21/03/2026',
          missao: 'Treinamento de comunicações',
          origem: 'Campo de Instrução',
          destino: 'Área Tática Bravo',
          motorista: 'Sd Rafael Torres'
        }
      ],
      historicoEncarregados: [
        {
          nome: '2º Sgt Daniel Costa',
          funcao: 'Encarregado da viatura',
          periodoInicio: '01/08/2024',
          periodoFim: '',
          om: '2ª Companhia de Artilharia',
          status: 'Ativo'
        }
      ]
    },
    {
      id: 3,
      numeroRegistro: 'CFN 411323000060',
      modelo: 'Esp 2x1 MCL POL ROAD KING FLHTP-I',
      omAtual: 'Pelotão de Polícia do Exército',
      ultimoUso: '03/04/2026',
      statusUso: 'Em manutenção',
      historicoUso: [
        {
          data: '03/04/2026',
          missao: 'Escolta administrativa',
          origem: 'Pelotão de Polícia do Exército',
          destino: 'Comando de Área',
          motorista: 'Cb Jonas Pereira'
        }
      ],
      historicoEncarregados: [
        {
          nome: '1º Sgt Renato Vieira',
          funcao: 'Encarregado da viatura',
          periodoInicio: '11/01/2025',
          periodoFim: '',
          om: 'Pelotão de Polícia do Exército',
          status: 'Ativo'
        }
      ]
    }
  ];

  selectedViaturaId = 1;

  get filteredViaturas(): ViaturaHistorico[] {
    const filtro = this.pesquisa.trim().toLowerCase();

    return this.viaturas.filter((viatura) => {
      if (!filtro) {
        return true;
      }

      return (
        viatura.numeroRegistro.toLowerCase().includes(filtro) ||
        viatura.modelo.toLowerCase().includes(filtro) ||
        viatura.omAtual.toLowerCase().includes(filtro)
      );
    });
  }

  get selectedViatura(): ViaturaHistorico | undefined {
    return this.filteredViaturas.find((viatura) => viatura.id === this.selectedViaturaId) ?? this.filteredViaturas[0];
  }

  selectViatura(id: number): void {
    this.selectedViaturaId = id;
  }

  clearPesquisa(): void {
    this.pesquisa = '';
  }
}
