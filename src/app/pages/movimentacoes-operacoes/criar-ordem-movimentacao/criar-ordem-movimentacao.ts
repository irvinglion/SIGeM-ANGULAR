import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-ordem-movimentacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-ordem-movimentacao.html',
  styleUrls: ['./criar-ordem-movimentacao.css']
})
export class CriarOrdemMovimentacaoComponent {
  form: FormGroup;
  submitMessage = '';

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

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitMessage = 'Ordem de movimenta\u00e7\u00e3o registrada localmente com sucesso.';
  }

  clearForm(): void {
    this.form.reset();
    this.submitMessage = '';
  }
}
