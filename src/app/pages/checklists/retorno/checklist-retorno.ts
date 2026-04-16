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
    'Caixa de mudan\u00e7as',
    'Transmiss\u00e3o',
    'Funcionamento do motor',
    'Instrumentos do painel',
    'Dire\u00e7\u00e3o',
    'Particularidades das VtrAnf'
  ];

  readonly itensInspecaoAltos: string[] = [
    'Combust\u00edvel, \u00f3leo e \u00e1gua',
    'Aquecimento',
    'Dispositivo de ventila\u00e7\u00e3o',
    'Porcas das rodas/aquecimento',
    'Pneum\u00e1ticos ou lagartas',
    'Vazamentos em geral',
    'Liga\u00e7\u00f5es para reboque',
    'Carroceria, carga e toldo',
    'Aspecto geral',
    'Particularidades das VtrAnf'
  ];

  gravarChecklist(): void {
    this.submitMessage = 'Checklist de retorno gravado com sucesso.';
  }
}
