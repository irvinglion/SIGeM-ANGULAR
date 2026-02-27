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
    'Extintor de Incêndio',
    'Combustível, óleo e água',
    'Reservatórios de ar comprimido',
    'Vazamentos em geral',
    'Instrumentos do painel',
    'Buzina e limpador de para-brisa',
    'Vidraças e espelhos retrovisores',
    'Órgãos de iluminação',
    'Cabos e conexões elétricos',
    'Pneumáticos ou lagartas',
    'Molas e amortecedores',
    'Ligações para reboque',
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
