import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-retorno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registrar-retorno.html',
  styleUrls: ['./registrar-retorno.css']
})
export class RegistrarRetornoComponent {

  form: FormGroup;

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
    console.log('Clicou no botão');
    console.log(this.form.value);
    alert('Botão funcionando!');
  }

  limparForm(): void {
    this.form.reset();
  }
}