import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  collapsed = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  /* 🔥 FALTAVA ISSO AQUI */
  toggleSubmenu(event: Event) {
    const link = event.currentTarget as HTMLElement;
    const submenu = link.nextElementSibling as HTMLElement;

    if (!submenu?.classList.contains('submenu')) return;

    event.preventDefault();
    submenu.classList.toggle('show');
  }
}
