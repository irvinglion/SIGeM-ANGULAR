import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserMode, UserService } from '../../../core/services/user.service';
import { DashboardComponent } from '../../dashboard/dashboard';
import { ControladorExpedicaoDashboardComponent } from '../controlador-expedicao-dashboard/controlador-expedicao-dashboard';
import { GestorDashboardComponent } from '../gestor-dashboard/gestor-dashboard';
import { MotoristaDashboardComponent } from '../motorista-dashboard/motorista-dashboard';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    MotoristaDashboardComponent,
    GestorDashboardComponent,
    ControladorExpedicaoDashboardComponent
  ],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css']
})
export class DashboardHomeComponent {
  mode: UserMode = 'admin_geral';

  constructor(private readonly userService: UserService) {
    this.userService.mode$.subscribe((mode) => {
      this.mode = mode;
    });
  }
}
