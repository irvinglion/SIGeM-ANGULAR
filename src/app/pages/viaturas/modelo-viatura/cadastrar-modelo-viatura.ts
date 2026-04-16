import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-modelo-viatura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-modelo-viatura.html',
  styleUrls: ['./cadastrar-modelo-viatura.css']
})
export class CadastrarModeloViaturaComponent {
  readonly form;
  submitMessage = '';

  readonly utilizacaoEspecificaOptions = ['Sem valor', 'Administrativa', 'Operacional', 'Logistica'];
  readonly fabricanteOptions = ['Sem valor', 'Iveco', 'Mitsubishi', 'Toyota', 'Volkswagen'];
  readonly tracaoOptions = ['Sem valor', '4x2', '4x4', '6x6'];
  readonly numeroRodasOptions = ['Sem valor', '2', '4', '6', '8'];
  readonly gerenciaMeiosOptions = ['Sem valor', 'Transporte', 'Blindados', 'Artilharia', 'Comando'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipoEquipamento: [''],
      equipamentoRelacionado: [''],
      codeq: [''],
      neb: [''],
      cicloOperativo: ['0'],
      nomenclatura: [''],
      modeloGenerico: [''],
      versao: [''],
      classificacaoViatura: [''],
      utilizacaoEspecifica: ['Sem valor'],
      nsn: [''],
      ncm: [''],
      fabricante: ['Sem valor'],
      tracao: ['Sem valor'],
      numeroRodas: ['Sem valor'],
      gerenciaMeios: ['Sem valor'],
      motor: [''],
      pneu: [''],
      bateria: ['']
    });
  }

  onSubmit(): void {
    this.submitMessage = 'Cadastro de modelo preparado com sucesso.';
  }

  clearForm(): void {
    this.form.reset({
      cicloOperativo: '0',
      utilizacaoEspecifica: 'Sem valor',
      fabricante: 'Sem valor',
      tracao: 'Sem valor',
      numeroRodas: 'Sem valor',
      gerenciaMeios: 'Sem valor'
    });
    this.submitMessage = '';
  }
}
