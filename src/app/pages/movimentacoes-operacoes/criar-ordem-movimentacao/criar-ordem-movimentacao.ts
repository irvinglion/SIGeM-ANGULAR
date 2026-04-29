import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

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

  constructor(
    private fb: FormBuilder,
    private readonly mockDb: MockDatabaseService
  ) {
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

    combineLatest([this.mockDb.getOrdensMovimentacao(), this.mockDb.getOms()]).subscribe(([ordens, oms]) => {
      const ordem = ordens[0];
      if (!ordem || this.form.dirty) {
        return;
      }

      const omResponsavel = oms.find((om) => om.id === ordem.omResponsavelId)?.sigla ?? ordem.omResponsavelId;

      this.form.patchValue({
        numeroOrdem: ordem.numeroOrdem,
        tipo: ordem.tipo,
        omResponsavel,
        dataInicio: ordem.dataInicio,
        dataTermino: ordem.dataTermino,
        documento: ordem.numeroOrdem,
        descricaoMov: ordem.descricao,
        tipoOpCodigo: ordem.tipoOperacao,
        tipoOpDescricao: ordem.tipoOperacao,
        opNome: ordem.operacaoNome,
        opSigla: ordem.operacaoSigla,
        opTipo: ordem.tipoOperacao,
        opDescricao: ordem.descricao
      });
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
