import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // 🔥 O QUE FALTAVA
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  collapsed = true;
  private isDesktop = true;

  constructor() {
    this.updateViewportState();
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

  private updateViewportState(): void {
    this.isDesktop = window.matchMedia('(min-width: 992px)').matches;
    this.collapsed = this.isDesktop;
  }
}
