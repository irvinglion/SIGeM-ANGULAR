import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { MockDatabaseService } from '../../../core/services/mock-database.service';

@Component({
  selector: 'app-registrar-retorno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-retorno.html',
  styleUrls: ['./registrar-retorno.css']
})
export class RegistrarRetornoComponent {
  form: FormGroup;
  submitMessage = '';

  constructor(
    private fb: FormBuilder,
    private readonly mockDb: MockDatabaseService
  ) {
    this.form = this.fb.group({
      dataHoraRetorno: [''],
      hodometroRetorno: [''],
      motoristaRetorno: [''],
      controladorExpedicao: [''],
      referenciaOrdemSaida: [''],
      irregularidades: [''],
      observacoes: ['']
    });

    combineLatest([
      this.mockDb.getOrdensRetorno(),
      this.mockDb.getOrdensSaida(),
      this.mockDb.getUsuarios()
    ]).subscribe(([retornos, saidas, usuarios]) => {
      const retorno = retornos[0];
      if (!retorno || this.form.dirty) {
        return;
      }

      const motorista = usuarios.find((usuario) => usuario.id === retorno.motoristaId)?.nomeCompleto ?? '';
      const controlador = usuarios.find((usuario) => usuario.id === retorno.controladorId)?.nomeCompleto ?? '';
      const saida = saidas.find((item) => item.id === retorno.ordemSaidaId);

      this.form.patchValue({
        dataHoraRetorno: `${retorno.data}T${retorno.horaRetorno}`,
        hodometroRetorno: retorno.hodometroRetorno,
        motoristaRetorno: motorista,
        controladorExpedicao: controlador,
        referenciaOrdemSaida: saida?.numeroOrdem ?? retorno.ordemSaidaId,
        irregularidades: retorno.irregularidades,
        observacoes: retorno.observacoesFinais
      });
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
