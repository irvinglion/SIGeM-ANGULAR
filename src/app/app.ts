import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  sidebarCollapsed = false;
}
