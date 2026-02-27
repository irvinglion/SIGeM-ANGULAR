import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserMode = 'admin_geral' | 'motorista' | 'gestor' | 'controlador_expedicao';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly modeSubject = new BehaviorSubject<UserMode>('admin_geral');
  readonly mode$ = this.modeSubject.asObservable();

  get currentMode(): UserMode {
    return this.modeSubject.value;
  }

  setGestorMode(): void {
    this.modeSubject.next('gestor');
  }

  setAdminGeralMode(): void {
    this.modeSubject.next('admin_geral');
  }

  setMotoristaMode(): void {
    this.modeSubject.next('motorista');
  }

  setControladorExpedicaoMode(): void {
    this.modeSubject.next('controlador_expedicao');
  }
}
