import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

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

  utilizacaoEspecificaOptions = ['Sem valor', 'Administrativa', 'Operacional', 'Logistica'];
  fabricanteOptions = ['Sem valor', 'Iveco', 'Mitsubishi', 'Toyota', 'Volkswagen'];
  tracaoOptions = ['Sem valor', '4x2', '4x4', '6x6'];
  numeroRodasOptions = ['Sem valor', '2', '4', '6', '8'];
  readonly gerenciaMeiosOptions = ['Sem valor', 'Transporte', 'Blindados', 'Artilharia', 'Comando'];

  constructor(
    private fb: FormBuilder,
    private readonly mockDb: MockDatabaseService
  ) {
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

    combineLatest([this.mockDb.getModelosViatura(), this.mockDb.getFabricantes()]).subscribe(([modelos, fabricantes]) => {
      this.fabricanteOptions = ['Sem valor', ...fabricantes.map((fabricante) => fabricante.nome)];
      this.tracaoOptions = ['Sem valor', ...Array.from(new Set(modelos.map((modelo) => modelo.tracao)))];
      this.numeroRodasOptions = ['Sem valor', ...Array.from(new Set(modelos.map((modelo) => modelo.numeroRodas)))];
      this.utilizacaoEspecificaOptions = ['Sem valor', ...Array.from(new Set(modelos.map((modelo) => modelo.emprego)))];

      const modelo = modelos[0];
      if (modelo && !this.form.dirty) {
        const fabricante = fabricantes.find((item) => item.id === modelo.fabricanteId);
        this.form.patchValue({
          tipoEquipamento: modelo.tipoViatura,
          equipamentoRelacionado: modelo.nomenclatura,
          codeq: modelo.codeq,
          neb: modelo.neb,
          cicloOperativo: modelo.vidaUtil,
          nomenclatura: modelo.nomenclatura,
          modeloGenerico: modelo.modeloGenerico,
          versao: modelo.versao,
          classificacaoViatura: modelo.tipoViatura,
          utilizacaoEspecifica: modelo.emprego,
          fabricante: fabricante?.nome ?? 'Sem valor',
          tracao: modelo.tracao,
          numeroRodas: modelo.numeroRodas,
          gerenciaMeios: 'Transporte'
        });
      }
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
