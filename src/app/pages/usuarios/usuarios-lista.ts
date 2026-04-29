import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MockDatabaseService, OM, Perfil, Usuario } from '../../core/services/mock-database.service';

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

  usuarios: UsuarioRegistro[] = [];

  constructor(
    private router: Router,
    private readonly mockDb: MockDatabaseService
  ) {
    combineLatest([this.mockDb.getUsuarios(), this.mockDb.getPerfis(), this.mockDb.getOms()]).subscribe(
      ([usuarios, perfis, oms]) => {
        this.usuarios = usuarios.map((usuario: Usuario) => ({
          nip: usuario.nip,
          nomeCompleto: usuario.nomeCompleto,
          perfil: this.findById(perfis, usuario.perfilId)?.nome ?? usuario.perfilId,
          om: this.findById(oms, usuario.omId)?.sigla ?? usuario.omId,
          email: usuario.email,
          telefone: usuario.telefone,
          ativo: usuario.ativo === 'true'
        }));
      }
    );
  }

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

  private findById<T extends Perfil | OM>(items: T[], id: string): T | undefined {
    return items.find((item) => item.id === id);
  }
}
