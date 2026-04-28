import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type UsuarioRegistro = {
  nip: string;
  nomeCompleto: string;
  perfil: string;
  om: string;
  email: string;
  telefone: string;
  ativo: boolean;
};

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-lista.html',
  styleUrls: ['./usuarios-lista.css']
})
export class UsuariosListaComponent {
  termoBusca = '';
  perfilFiltro = '';
  omFiltro = '';
  exibirFiltros = false;

  readonly usuarios: UsuarioRegistro[] = [
    {
      nip: '123456789',
      nomeCompleto: 'Joao da Silva',
      perfil: 'Motorista',
      om: 'CTEC',
      email: 'joao.silva@marinha.mil.br',
      telefone: '(61) 99999-9999',
      ativo: true
    },
    {
      nip: '987654321',
      nomeCompleto: 'Maria Oliveira',
      perfil: 'Encarregado',
      om: 'CMAT',
      email: 'maria.oliveira@marinha.mil.br',
      telefone: '(61) 98888-8888',
      ativo: true
    },
    {
      nip: '456789123',
      nomeCompleto: 'Carlos Ferreira',
      perfil: 'Supervisor',
      om: 'CTEC',
      email: 'carlos.ferreira@marinha.mil.br',
      telefone: '(61) 97777-7777',
      ativo: true
    },
    {
      nip: '321654987',
      nomeCompleto: 'Fernanda Costa',
      perfil: 'Motorista',
      om: 'CMAT',
      email: 'fernanda.costa@marinha.mil.br',
      telefone: '(61) 96666-6666',
      ativo: false
    },
    {
      nip: '789123456',
      nomeCompleto: 'Bruno Almeida',
      perfil: 'Supervisor',
      om: 'CTEC',
      email: 'bruno.almeida@marinha.mil.br',
      telefone: '(61) 95555-5555',
      ativo: true
    }
  ];

  constructor(private router: Router) {}

  get usuariosFiltrados(): UsuarioRegistro[] {
    const termo = this.termoBusca.trim().toLowerCase();
    const perfil = this.perfilFiltro.trim().toLowerCase();
    const om = this.omFiltro.trim().toLowerCase();

    return this.usuarios.filter((usuario) => {
      const correspondeTermo =
        !termo ||
        usuario.nomeCompleto.toLowerCase().includes(termo) ||
        usuario.nip.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo);
      const correspondePerfil = !perfil || usuario.perfil.toLowerCase().includes(perfil);
      const correspondeOm = !om || usuario.om.toLowerCase().includes(om);

      return correspondeTermo && correspondePerfil && correspondeOm;
    });
  }

  toggleFiltros(): void {
    this.exibirFiltros = !this.exibirFiltros;
  }

  limparFiltros(): void {
    this.termoBusca = '';
    this.perfilFiltro = '';
    this.omFiltro = '';
  }

  abrirCadastro(usuario?: UsuarioRegistro): void {
    void this.router.navigate(['/config/usuario/cadastrar'], usuario ? { state: { usuario } } : undefined);
  }
}
