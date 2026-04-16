import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
  readonly modeloOptions: ModeloOption[] = [
    {
      codeq: '0993160006000',
      label: '0993160006000 - Esp 2x1 MCL POL I/H. DAVIDSON',
      tracao: '2x1',
      emprego: 'Policiamento',
      rotinaManutencao: 'Rotina leve de motocicletas'
    },
    {
      codeq: '0993160006002',
      label: '0993160006002 - Esp 2x1 MCL POL ROAD KING FLHTP-I',
      tracao: '2x1',
      emprego: 'Policiamento ostensivo',
      rotinaManutencao: 'Rotina de estrada'
    },
    {
      codeq: '0993540003018',
      label: '0993540003018 - VtrBldAnfEsp SL CMDO CLAnf AAV7A1-C',
      tracao: 'Lagartas',
      emprego: 'Comando anf\u00edbio',
      rotinaManutencao: 'Rotina blindada anf\u00edbia'
    },
    {
      codeq: '0998190004000',
      label: '0998190004000 - VtrBldEsp 4x4 POST MET AV-ASTROS',
      tracao: '4x4',
      emprego: 'Artilharia ASTROS',
      rotinaManutencao: 'Rotina de artilharia'
    },
    {
      codeq: '0998190001000',
      label: '0998190001000 - VtrBldEsp 6x6 LMU ASTROS AV-LMU',
      tracao: '6x6',
      emprego: 'Lan\u00e7ador m\u00faltiplo',
      rotinaManutencao: 'Rotina pesada'
    }
  ];

  readonly form;
  selectedFotoName = 'Nenhum arquivo selecionado.';
  selectedDocumentoName = 'Nenhum arquivo selecionado.';
  submitMessage = '';

  constructor(private fb: FormBuilder) {
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
