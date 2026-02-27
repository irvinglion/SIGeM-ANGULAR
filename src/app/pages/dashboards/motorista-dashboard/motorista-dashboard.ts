import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ItemMotorista {
  id: number;
  cfn: string;
  modelo: string;
  atividade: string;
}

@Component({
  selector: 'app-motorista-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './motorista-dashboard.html',
  styleUrls: ['./motorista-dashboard.css']
})
export class MotoristaDashboardComponent {
  readonly totalChecklistSaida = 1;
  readonly totalChecklistRetorno = 1;
  readonly totalRetornoViatura = 1;

  readonly itensChecklistSaida: ItemMotorista[] = [
    { id: 1, cfn: '33378300', modelo: 'JLTV', atividade: 'Missao Furnas 2/2026' }
  ];

  readonly itensChecklistRetorno: ItemMotorista[] = [
    { id: 1, cfn: '33378300', modelo: 'JLTV', atividade: 'Missao Furnas 2/2026' }
  ];

  readonly itensRetornoViatura: ItemMotorista[] = [
    { id: 1, cfn: '33378300', modelo: 'JLTV', atividade: 'Missao Furnas 2/2026' }
  ];
}
