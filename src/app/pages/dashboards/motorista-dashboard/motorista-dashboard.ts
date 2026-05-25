import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type StatusOrdemMotorista = 'Pendente' | 'Em andamento' | 'Concluída';
type ChecklistOrdemMotorista = 'saida' | 'retorno';

interface OrdemMotorista {
  numero: string;
  status: StatusOrdemMotorista;
  checklist: ChecklistOrdemMotorista;
  atividade: string;
  veiculo: string;
  origem: string;
  destino: string;
  dataPrevista: string;
  horaPrevista: string;
}

interface FiltroStatus {
  label: string;
  value: StatusOrdemMotorista | 'Todas';
}

@Component({
  selector: 'app-motorista-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './motorista-dashboard.html',
  styleUrls: ['./motorista-dashboard.css']
})
export class MotoristaDashboardComponent {
  filtroStatus: FiltroStatus['value'] = 'Todas';
  termoBusca = '';

  readonly filtros: FiltroStatus[] = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Em andamento', value: 'Em andamento' },
    { label: 'Concluída', value: 'Concluída' }
  ];

  readonly ordens: OrdemMotorista[] = [
    {
      numero: 'OM 2026/0001',
      status: 'Pendente',
      checklist: 'saida',
      atividade: 'Missão Furnas 2/2026',
      veiculo: 'JLTV - 33378300',
      origem: 'Fortaleza de São José',
      destino: 'CtecFN',
      dataPrevista: '23/05/2026',
      horaPrevista: '08:00'
    },
    {
      numero: 'OM 2026/0002',
      status: 'Em andamento',
      checklist: 'retorno',
      atividade: 'Transporte de Material',
      veiculo: 'JLTV - 33378300',
      origem: 'Fortaleza de São José',
      destino: 'CEFAN',
      dataPrevista: '23/05/2026',
      horaPrevista: '18:00'
    },
    {
      numero: 'OM 2026/0003',
      status: 'Pendente',
      checklist: 'saida',
      atividade: 'Apoio Administrativo',
      veiculo: 'JLTV - 33378300',
      origem: 'Fortaleza de São José',
      destino: 'BFNIG',
      dataPrevista: '24/05/2026',
      horaPrevista: '07:30'
    }
  ];

  get ordensFiltradas(): OrdemMotorista[] {
    const termo = this.termoBusca.trim().toLocaleLowerCase('pt-BR');

    return this.ordens.filter((ordem) => {
      const statusValido = this.filtroStatus === 'Todas' || ordem.status === this.filtroStatus;
      const buscaValida =
        !termo ||
        [
          ordem.numero,
          ordem.atividade,
          ordem.veiculo,
          ordem.origem,
          ordem.destino,
          ordem.status
        ].some((valor) => valor.toLocaleLowerCase('pt-BR').includes(termo));

      return statusValido && buscaValida;
    });
  }

  totalPorStatus(status: FiltroStatus['value']): number {
    return status === 'Todas' ? this.ordens.length : this.ordens.filter((ordem) => ordem.status === status).length;
  }

  rotaChecklist(ordem: OrdemMotorista): string {
    return ordem.checklist === 'retorno' ? '/checklists/retorno' : '/checklists/primeiro-escalao';
  }

  textoAcao(ordem: OrdemMotorista): string {
    return ordem.checklist === 'retorno' ? 'Preencher Checklist de Retorno' : 'Preencher Checklist de Saída';
  }

  iconeOrdem(ordem: OrdemMotorista): string {
    return ordem.checklist === 'retorno' ? 'bi-truck' : 'bi-clipboard2-check';
  }
}
