import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // 🔥 O QUE FALTAVA
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  collapsed = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  toggleSubmenu(event: Event): void {
    event.stopPropagation();

    const link = event.currentTarget as HTMLElement | null;
    if (!link) return;

    const submenu = link.nextElementSibling as HTMLElement | null;
    if (!submenu || !submenu.classList.contains('submenu')) return;

    submenu.classList.toggle('show');
  }
}
