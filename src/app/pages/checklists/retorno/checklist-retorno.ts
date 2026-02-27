import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checklist-retorno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist-retorno.html',
  styleUrls: ['./checklist-retorno.css']
})
export class ChecklistRetornoComponent {
  submitMessage = '';

  readonly itensInspecaoDuranteMovimento: string[] = [
    'Freio',
    'Embreagem',
    'Caixa de Mudancas',
    'Transmissao',
    'Funcionamento do motor',
    'Instrumentos do painel',
    'Direcao',
    'Particularidades das VtrAnf'
  ];

  readonly itensInspecaoAltos: string[] = [
    'Combustivel, oleo e agua',
    'Aquecimento',
    'Dispositivo de ventilacao',
    'Porcas das rodas/aquecimento',
    'Pneumaticos ou lagartas',
    'Vazamentos em geral',
    'Ligacoes para reboque',
    'Carroceria, carga e toldo',
    'Aspecto geral',
    'Particularidades das VtrAnf'
  ];

  gravarChecklist(): void {
    this.submitMessage = 'Checklist de retorno gravado com sucesso.';
  }
}
