import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-saida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-saida.html',
  styleUrls: ['./registrar-saida.css']
})
export class RegistrarSaidaComponent {
  form: FormGroup;
  submitMessage = '';

  qrCodeUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=SIGEM-DEMO-VIATURA-001';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numeroOrdem: ['', Validators.required],
      data: ['', Validators.required],
      horaSaidaPlanejada: ['', Validators.required],
      hodometroSaida: [null, Validators.required],
      destino: ['', Validators.required],
      missao: ['', Validators.required],
      referencia: [''],
      motorista: ['', Validators.required],
      controladorExpedicao: ['', Validators.required],
      utilizador: ['', Validators.required],
      observacoes: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitMessage = 'Ordem de saída registrada localmente com sucesso.';
  }

  clearForm(): void {
    this.form.reset();
    this.submitMessage = '';
  }
}
