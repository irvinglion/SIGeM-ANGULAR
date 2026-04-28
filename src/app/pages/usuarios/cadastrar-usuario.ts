import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type UsuarioEdicao = {
  nip: string;
  nomeCompleto: string;
  perfil: string;
  om: string;
  email: string;
  telefone: string;
  ativo: boolean;
};

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-usuario.html',
  styleUrls: ['./cadastrar-usuario.css']
})
export class CadastrarUsuarioComponent {
  readonly perfis = ['Motorista', 'Encarregado', 'Supervisor', 'Gestor'];
  readonly oms = ['CTEC', 'CMAT', 'B Adm Ap', 'Cia Cmdo'];
  readonly form;
  readonly usuarioEdicao = history.state['usuario'] as UsuarioEdicao | undefined;

  submitMessage = '';

  get isEdicao(): boolean {
    return !!this.usuarioEdicao;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nip: [this.usuarioEdicao?.nip ?? ''],
      nomeCompleto: [this.usuarioEdicao?.nomeCompleto ?? ''],
      email: [this.usuarioEdicao?.email ?? ''],
      telefone: [this.usuarioEdicao?.telefone ?? ''],
      perfil: [this.usuarioEdicao?.perfil ?? ''],
      om: [this.usuarioEdicao?.om ?? ''],
      ativo: [this.usuarioEdicao?.ativo ?? true]
    });
  }

  voltarParaLista(): void {
    void this.router.navigate(['/config/usuario/lista']);
  }

  limparFormulario(): void {
    this.form.reset({
      nip: '',
      nomeCompleto: '',
      email: '',
      telefone: '',
      perfil: '',
      om: '',
      ativo: true
    });
    this.submitMessage = '';
  }

  salvar(): void {
    this.submitMessage = this.isEdicao
      ? 'Usu\u00e1rio atualizado com sucesso. Registro pronto para integra\u00e7\u00e3o.'
      : 'Usu\u00e1rio preparado para cadastro com sucesso. Registro pronto para integra\u00e7\u00e3o.';
  }
}
