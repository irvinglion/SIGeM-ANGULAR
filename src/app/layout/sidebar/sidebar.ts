import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnDestroy {
  showOnlyGestorItem = false;
  collapsed = true;
  private isDesktop = true;
  private modeSub?: Subscription;

  constructor(private readonly userService: UserService) {
    this.updateViewportState();
    this.modeSub = this.userService.mode$.subscribe((mode) => {
      this.showOnlyGestorItem = mode === 'gestor';
    });
  }

  onMouseEnter(): void {
    if (!this.isDesktop) return;
    this.collapsed = false;
  }

  onMouseLeave(): void {
    if (!this.isDesktop) return;
    this.collapsed = true;
  }

  toggleSubmenu(event: Event): void {
    event.stopPropagation();

    const link = event.currentTarget as HTMLElement | null;
    if (!link) return;

    const submenu = link.nextElementSibling as HTMLElement | null;
    if (!submenu || !submenu.classList.contains('submenu')) return;

    submenu.classList.toggle('show');
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportState();
  }

  ngOnDestroy(): void {
    this.modeSub?.unsubscribe();
  }

  returnToFullMode(): void {
    this.userService.setAdminGeralMode();
  }

  private updateViewportState(): void {
    this.isDesktop = window.matchMedia('(min-width: 992px)').matches;
    this.collapsed = this.isDesktop;
  }
}
