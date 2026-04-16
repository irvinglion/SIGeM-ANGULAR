import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checklist-primeiro-escalao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist-primeiro-escalao.html',
  styleUrls: ['./checklist-primeiro-escalao.css']
})
export class ChecklistPrimeiroEscalaoComponent {
  submitMessage = '';

  readonly itensInspecaoAntesPartida: string[] = [
    'Extintor de inc\u00eandio',
    'Combust\u00edvel, \u00f3leo e \u00e1gua',
    'Reservat\u00f3rios de ar comprimido',
    'Vazamentos em geral',
    'Instrumentos do painel',
    'Buzina e limpador de para-brisa',
    'Vidra\u00e7as e espelhos retrovisores',
    '\u00d3rg\u00e3os de ilumina\u00e7\u00e3o',
    'Cabos e conex\u00f5es el\u00e9tricos',
    'Pneum\u00e1ticos ou lagartas',
    'Molas e amortecedores',
    'Liga\u00e7\u00f5es para reboque',
    'Carroceria, carga e toldo',
    'Ferramentas e equipamentos',
    'Funcionamento do motor',
    'Documentos',
    'Particularidades das VtrAnf'
  ];

  aprovar(): void {
    this.submitMessage = 'Checklist aprovado com sucesso.';
  }

  reprovar(): void {
    this.submitMessage = 'Checklist reprovado. Revise os itens pendentes.';
  }
}
