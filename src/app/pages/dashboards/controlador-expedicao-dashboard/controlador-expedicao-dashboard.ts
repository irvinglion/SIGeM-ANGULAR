import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RetornoAguardandoValidacao {
  cfn: string;
  modelo: string;
  ultimaMissao: string;
  status: 'Aguardando Validacao';
}

interface ChecklistAguardandoValidacao {
  cfn: string;
  modelo: string;
  motorista: string;
  data: string;
  status: 'Aguardando Conferencia' | 'Inconsistencia Detectada';
}

interface ChecklistRetornoAguardandoValidacao {
  cfn: string;
  modelo: string;
  motorista: string;
  data: string;
  status: 'Aguardando Conferencia';
}

interface ViaturaDisponivel {
  cfn: string;
  modelo: string;
  atividade: string;
  status: 'Disponivel';
}

@Component({
  selector: 'app-controlador-expedicao-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './controlador-expedicao-dashboard.html',
  styleUrls: ['./controlador-expedicao-dashboard.css']
})
export class ControladorExpedicaoDashboardComponent {
  readonly ordensPendentes = 5;
  readonly checklistsPrimeiroEscalao = 4;
  readonly emMissao = 27;
  readonly viaturasDisponiveis = 150;

  readonly retornosAguardandoValidacao: RetornoAguardandoValidacao[] = [
    { cfn: 'EB-0231', modelo: 'CLANF', ultimaMissao: 'Representacao', status: 'Aguardando Validacao' }
  ];

  readonly checklistsAguardandoValidacao: ChecklistAguardandoValidacao[] = [
    { cfn: 'EB-0452', modelo: 'CLANF', motorista: 'Cb Silva', data: '20/02/2026', status: 'Aguardando Conferencia' },
    { cfn: 'EB-0678', modelo: 'Hilux 4x4', motorista: '3º Sgt Lima', data: '20/02/2026', status: 'Inconsistencia Detectada' }
  ];

  readonly checklistsRetornoAguardandoValidacao: ChecklistRetornoAguardandoValidacao[] = [
    { cfn: 'EB-0123', modelo: 'Marrua AM11', motorista: 'Cb Souza', data: '21/02/2026', status: 'Aguardando Conferencia' }
  ];

  readonly viaturas: ViaturaDisponivel[] = [
    { cfn: 'ABC1D23', modelo: 'AAV-7A1 RAM/RS', atividade: 'Administrativo', status: 'Disponivel' },
    { cfn: 'QMB4T21', modelo: 'VtrRbq TNE 1 1/2 Ton 2R', atividade: 'Apoio Logistico', status: 'Disponivel' }
  ];
}
