import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

type StatusOrdem = 'Concluida' | 'Pendente' | 'Cancelada';

interface OrdemMovimentacao {
  numero: string;
  cfn: string;
  viatura: string;
  data: string;
  responsavel: string;
  status: StatusOrdem;
}

@Component({
  selector: 'app-gestor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestor-dashboard.html',
  styleUrls: ['./gestor-dashboard.css']
})
export class GestorDashboardComponent {
  searchTerm = '';
  selectedStatus: 'Todos' | StatusOrdem = 'Todos';

  readonly ordens: OrdemMovimentacao[] = [
    { numero: 'OMV-2026-00124', cfn: 'QMB4T21', viatura: 'VtrRbq TNE 1 1/2 Ton 2R', data: '20/02/2026', responsavel: '1º Sgt Almeida', status: 'Concluida' },
    { numero: 'OMV-2026-00125', cfn: 'RTH9P88', viatura: 'VtrSemi-Rbq TE 40 Ton 12R PRANCHA', data: '19/02/2026', responsavel: 'Cap Silva', status: 'Pendente' },
    { numero: 'OMV-2026-00126', cfn: 'AB1JD23', viatura: 'VtrTNE 3/4 Ton 4x4 MARRUA AM11', data: '18/02/2026', responsavel: 'Ten Oliveira', status: 'Cancelada' },
    { numero: 'OMV-2026-00127', cfn: 'JKL3H56', viatura: 'VtrTE 1 Ton 4x4 AMB UTI LAND ROVER DEFENDER 130 PUMA', data: '17/02/2026', responsavel: 'Subten Costa', status: 'Concluida' },
    { numero: 'OMV-2026-00128', cfn: 'ZXC7M90', viatura: 'VtrEsp 5 Ton 4x2 GUINC PRANCHA ATEGO 1719/48', data: '16/02/2026', responsavel: 'CB Santos', status: 'Pendente' }
  ];

  constructor(private readonly router: Router) {}

  get totalOrdens(): number {
    return this.ordens.length;
  }

  get ordensConcluidas(): number {
    return this.ordens.filter((o) => o.status === 'Concluida').length;
  }

  get ordensPendentes(): number {
    return this.ordens.filter((o) => o.status === 'Pendente').length;
  }

  get filteredOrdens(): OrdemMovimentacao[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.ordens.filter((ordem) => {
      const matchesText = !term
        || ordem.numero.toLowerCase().includes(term)
        || ordem.cfn.toLowerCase().includes(term)
        || ordem.viatura.toLowerCase().includes(term)
        || ordem.responsavel.toLowerCase().includes(term);

      const matchesStatus = this.selectedStatus === 'Todos' || ordem.status === this.selectedStatus;

      return matchesText && matchesStatus;
    });
  }

  onSearch(value: string): void {
    this.searchTerm = value;
  }

  onStatusChange(value: string): void {
    if (value === 'Todos' || value === 'Concluida' || value === 'Pendente' || value === 'Cancelada') {
      this.selectedStatus = value;
    }
  }

  goToNovaOrdem(): void {
    this.router.navigate(['/movimentacoes/criar-ordem-movimentacao']);
  }
}
