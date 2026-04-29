import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

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

  constructor(
    private fb: FormBuilder,
    private readonly mockDb: MockDatabaseService
  ) {
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

    combineLatest([
      this.mockDb.getOrdensSaida(),
      this.mockDb.getUsuarios(),
      this.mockDb.getViaturas()
    ]).subscribe(([ordens, usuarios, viaturas]) => {
      const ordem = ordens[0];
      if (!ordem || this.form.dirty) {
        return;
      }

      const motorista = usuarios.find((usuario) => usuario.id === ordem.motoristaId)?.nomeCompleto ?? '';
      const controlador = usuarios.find((usuario) => usuario.id === ordem.controladorId)?.nomeCompleto ?? '';
      const utilizador = usuarios.find((usuario) => usuario.id === ordem.utilizadorId)?.nomeCompleto ?? '';
      const viatura = viaturas.find((item) => item.id === ordem.viaturaId);

      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
        viatura?.numeroRegistro ?? ordem.viaturaId
      )}`;

      this.form.patchValue({
        numeroOrdem: ordem.numeroOrdem,
        data: ordem.data,
        horaSaidaPlanejada: ordem.horaSaidaPlanejada,
        hodometroSaida: ordem.hodometroSaida,
        destino: ordem.destino,
        missao: ordem.missao,
        referencia: ordem.referencia,
        motorista,
        controladorExpedicao: controlador,
        utilizador
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitMessage = 'Ordem de sa\u00edda registrada localmente com sucesso.';
  }

  clearForm(): void {
    this.form.reset();
    this.submitMessage = '';
  }
}
