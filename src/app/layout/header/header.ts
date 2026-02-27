import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  isUserMenuOpen = false;
  currentUserLabel = 'Admin - Tela geral';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.userService.mode$.subscribe((mode) => {
      this.currentUserLabel = mode === 'admin_geral'
        ? 'Admin - Tela geral'
        : mode === 'gestor'
          ? 'Gestor CMatFN'
          : mode === 'controlador_expedicao'
            ? 'Controlador de Expedicao'
            : 'Motorista CMatFN';
    });
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeUserMenu();
  }

  setGestorMode(): void {
    this.userService.setGestorMode();
    this.router.navigate(['/']);
    this.closeUserMenu();
  }

  setAdminGeralMode(): void {
    this.userService.setAdminGeralMode();
    this.router.navigate(['/']);
    this.closeUserMenu();
  }

  setMotoristaMode(): void {
    this.userService.setMotoristaMode();
    this.router.navigate(['/']);
    this.closeUserMenu();
  }

  setControladorExpedicaoMode(): void {
    this.userService.setControladorExpedicaoMode();
    this.router.navigate(['/']);
    this.closeUserMenu();
  }
}
