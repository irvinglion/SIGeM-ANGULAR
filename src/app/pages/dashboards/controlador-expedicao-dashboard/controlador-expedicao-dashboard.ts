import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ControladorExpedicaoMockService } from '../../../core/services/controlador-expedicao-mock.service';

@Component({
  selector: 'app-controlador-expedicao-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './controlador-expedicao-dashboard.html',
  styleUrls: ['./controlador-expedicao-dashboard.css']
})
export class ControladorExpedicaoDashboardComponent {
  readonly dashboardData$;

  constructor(private readonly controladorMockService: ControladorExpedicaoMockService) {
    this.dashboardData$ = this.controladorMockService.dashboardData$;
  }
}
