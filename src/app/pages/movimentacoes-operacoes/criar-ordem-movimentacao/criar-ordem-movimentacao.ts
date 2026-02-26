import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-ordem-movimentacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-ordem-movimentacao.html',
  styleUrls: ['./criar-ordem-movimentacao.css']
})
export class CriarOrdemMovimentacaoComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numeroOrdem: ['', Validators.required],
      tipo: ['', Validators.required],
      omResponsavel: [''],
      dataInicio: [''],
      dataTermino: [''],
      documento: [''],
      descricaoMov: [''],
      tipoOpCodigo: [''],
      tipoOpDescricao: [''],
      opNome: [''],
      opSigla: [''],
      opTipo: [''],
      opDescricao: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados da Ordem:', this.form.value);
    }
  }
}
