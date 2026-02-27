import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export type ChecklistTipo = 'primeiro_escalao' | 'retorno';
export type ChecklistStatus = 'Aguardando Conferencia' | 'Inconsistencia Detectada' | 'Aprovado' | 'Reprovado';

export interface RetornoAguardandoValidacao {
  id: string;
  cfn: string;
  modelo: string;
  ultimaMissao: string;
  status: 'Aguardando Validacao';
}

export interface ChecklistValidacao {
  id: string;
  tipo: ChecklistTipo;
  cfn: string;
  modelo: string;
  motorista: string;
  data: string;
  status: ChecklistStatus;
}

export interface ViaturaDisponivel {
  cfn: string;
  modelo: string;
  atividade: string;
  status: 'Disponivel';
}

interface ControladorState {
  ordensPendentes: number;
  emMissao: number;
  viaturas: ViaturaDisponivel[];
  retornosAguardandoValidacao: RetornoAguardandoValidacao[];
  checklists: ChecklistValidacao[];
}

export interface ControladorDashboardData {
  ordensPendentes: number;
  emMissao: number;
  viaturasDisponiveis: number;
  checklistsPrimeiroEscalao: number;
  retornosAguardandoValidacao: RetornoAguardandoValidacao[];
  checklistsAguardandoValidacao: ChecklistValidacao[];
  checklistsRetornoAguardandoValidacao: ChecklistValidacao[];
  viaturas: ViaturaDisponivel[];
}

const INITIAL_STATE: ControladorState = {
  ordensPendentes: 5,
  emMissao: 27,
  viaturas: [
    { cfn: 'ABC1D23', modelo: 'AAV-7A1 RAM/RS', atividade: 'Administrativo', status: 'Disponivel' },
    { cfn: 'QMB4T21', modelo: 'VtrRbq TNE 1 1/2 Ton 2R', atividade: 'Apoio Logistico', status: 'Disponivel' }
  ],
  retornosAguardandoValidacao: [
    { id: 'ret-001', cfn: 'EB-0231', modelo: 'CLANF', ultimaMissao: 'Representacao', status: 'Aguardando Validacao' }
  ],
  checklists: [
    {
      id: 'chk-001',
      tipo: 'primeiro_escalao',
      cfn: 'EB-0452',
      modelo: 'CLANF',
      motorista: 'Cb Silva',
      data: '20/02/2026',
      status: 'Aguardando Conferencia'
    },
    {
      id: 'chk-002',
      tipo: 'primeiro_escalao',
      cfn: 'EB-0678',
      modelo: 'Hilux 4x4',
      motorista: '3o Sgt Lima',
      data: '20/02/2026',
      status: 'Inconsistencia Detectada'
    },
    {
      id: 'chk-003',
      tipo: 'retorno',
      cfn: 'EB-0123',
      modelo: 'Marrua AM11',
      motorista: 'Cb Souza',
      data: '21/02/2026',
      status: 'Aguardando Conferencia'
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class ControladorExpedicaoMockService {
  private readonly stateSubject = new BehaviorSubject<ControladorState>(INITIAL_STATE);
  readonly state$ = this.stateSubject.asObservable();

  readonly dashboardData$ = this.state$.pipe(
    map((state): ControladorDashboardData => {
      const pendingPrimeiroEscalao = state.checklists.filter(
        (item) => item.tipo === 'primeiro_escalao' && this.isChecklistPendente(item.status)
      );
      const pendingRetorno = state.checklists.filter(
        (item) => item.tipo === 'retorno' && this.isChecklistPendente(item.status)
      );

      return {
        ordensPendentes: state.ordensPendentes,
        emMissao: state.emMissao,
        viaturasDisponiveis: state.viaturas.length,
        checklistsPrimeiroEscalao: pendingPrimeiroEscalao.length,
        retornosAguardandoValidacao: state.retornosAguardandoValidacao,
        checklistsAguardandoValidacao: pendingPrimeiroEscalao,
        checklistsRetornoAguardandoValidacao: pendingRetorno,
        viaturas: state.viaturas
      };
    })
  );

  readonly checklistsPrimeiroEscalao$ = this.state$.pipe(
    map((state) =>
      state.checklists.filter((item) => item.tipo === 'primeiro_escalao' && this.isChecklistPendente(item.status))
    )
  );

  readonly checklistsRetorno$ = this.state$.pipe(
    map((state) => state.checklists.filter((item) => item.tipo === 'retorno' && this.isChecklistPendente(item.status)))
  );

  aprovarChecklist(id: string): void {
    this.updateChecklistStatus(id, 'Aprovado');
  }

  reprovarChecklist(id: string): void {
    this.updateChecklistStatus(id, 'Reprovado');
  }

  private updateChecklistStatus(id: string, status: ChecklistStatus): void {
    const currentState = this.stateSubject.value;
    const updatedChecklists = currentState.checklists.map((item) => (item.id === id ? { ...item, status } : item));
    this.stateSubject.next({ ...currentState, checklists: updatedChecklists });
  }

  private isChecklistPendente(status: ChecklistStatus): boolean {
    return status === 'Aguardando Conferencia' || status === 'Inconsistencia Detectada';
  }
}
