import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-saida',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-saida.html',
  styleUrls: ['./registrar-saida.css']
})
export class RegistrarSaidaComponent {

  form: FormGroup;

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

    console.log('Dados da ordem de saída:', this.form.value);

    // futuramente:
    // this.service.salvar(this.form.value)
    // this.router.navigate(['/alguma-rota'])
  }
}
