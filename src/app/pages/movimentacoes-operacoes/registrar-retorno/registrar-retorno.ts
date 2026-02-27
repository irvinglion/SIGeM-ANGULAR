import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registrar-retorno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrar-retorno.html',
  styleUrls: ['./registrar-retorno.css']
})
export class RegistrarRetornoComponent {
  form: FormGroup;
  submitMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dataHoraRetorno: [''],
      hodometroRetorno: [''],
      motoristaRetorno: [''],
      controladorExpedicao: [''],
      referenciaOrdemSaida: [''],
      irregularidades: [''],
      observacoes: ['']
    });
  }

  onSubmit(): void {
    this.submitMessage = 'Retorno registrado localmente com sucesso.';
  }

  limparForm(): void {
    this.form.reset();
    this.submitMessage = '';
  }
}
