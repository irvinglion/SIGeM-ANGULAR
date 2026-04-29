import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockDatabaseService, ModeloViatura } from '../../../core/services/mock-database.service';

type ModeloOption = {
  codeq: string;
  label: string;
  tracao: string;
  emprego: string;
  rotinaManutencao: string;
};

@Component({
  selector: 'app-cadastrar-viatura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-viatura.html',
  styleUrls: ['./cadastrar-viatura.css']
})
export class CadastrarViaturaComponent {
  modeloOptions: ModeloOption[] = [];

  readonly form;
  selectedFotoName = 'Nenhum arquivo selecionado.';
  selectedDocumentoName = 'Nenhum arquivo selecionado.';
  submitMessage = '';

  constructor(
    private fb: FormBuilder,
    private readonly mockDb: MockDatabaseService
  ) {
    this.form = this.fb.group({
      modeloCodeq: [''],
      tracao: [''],
      emprego: [''],
      rotinaManutencao: [''],
      grupoSequencial: [''],
      numeroRegistro: [''],
      numeroPatrimonial: [''],
      chassi: [''],
      numeroMotor: [''],
      anoFabricacao: [''],
      fimCiclo: [''],
      omAtual: [''],
      omDestaque: [''],
      observacoes: ['']
    });

    this.mockDb.getModelosViatura().subscribe((modelos) => {
      this.modeloOptions = modelos.map((modelo: ModeloViatura) => ({
        codeq: modelo.codeq,
        label: `${modelo.codeq} - ${modelo.nomenclatura}`,
        tracao: modelo.tracao,
        emprego: modelo.emprego,
        rotinaManutencao: modelo.rotinaManutencao
      }));
    });
  }

  onModeloChange(): void {
    const selectedCodeq = this.form.get('modeloCodeq')?.value as string;
    const modelo = this.modeloOptions.find((option) => option.codeq === selectedCodeq);

    if (!modelo) {
      this.form.patchValue(
        {
          tracao: '',
          emprego: '',
          rotinaManutencao: ''
        },
        { emitEvent: false }
      );
      return;
    }

    this.form.patchValue(
      {
        tracao: modelo.tracao,
        emprego: modelo.emprego,
        rotinaManutencao: modelo.rotinaManutencao
      },
      { emitEvent: false }
    );
  }

  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFotoName = input.files?.[0]?.name ?? 'Nenhum arquivo selecionado.';
  }

  onDocumentoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDocumentoName = input.files?.[0]?.name ?? 'Nenhum arquivo selecionado.';
  }

  onSubmit(): void {
    this.submitMessage = 'Viatura preparada para cadastro com sucesso.';
  }

  clearForm(): void {
    this.form.reset({
      modeloCodeq: '',
      tracao: '',
      emprego: '',
      rotinaManutencao: '',
      grupoSequencial: '',
      numeroRegistro: '',
      numeroPatrimonial: '',
      chassi: '',
      numeroMotor: '',
      anoFabricacao: '',
      fimCiclo: '',
      omAtual: '',
      omDestaque: '',
      observacoes: ''
    });
    this.selectedFotoName = 'Nenhum arquivo selecionado.';
    this.selectedDocumentoName = 'Nenhum arquivo selecionado.';
    this.submitMessage = '';
  }
}
