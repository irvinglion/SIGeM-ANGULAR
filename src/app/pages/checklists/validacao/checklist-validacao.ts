import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Checklist, MockDatabaseService } from '../../../core/services/mock-database.service';

type ChecklistTipo = 'primeiro_escalao' | 'retorno';

type ChecklistValidacao = {
  id: string;
  tipo: string;
  cfn: string;
  modelo: string;
  motorista: string;
  data: string;
  status: string;
};

@Component({
  selector: 'app-checklist-validacao',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checklist-validacao.html',
  styleUrls: ['./checklist-validacao.css']
})
export class ChecklistValidacaoComponent {
  readonly focoTipo$;
  readonly focoId$;
  readonly checklistsPrimeiroEscalao$;
  readonly checklistsRetorno$;

  private readonly statusOverrides$ = new BehaviorSubject<Record<string, string>>({});

  constructor(
    private readonly mockDb: MockDatabaseService,
    private readonly route: ActivatedRoute
  ) {
    this.focoTipo$ = this.route.queryParamMap.pipe(
      map((params) => (params.get('tipo') as ChecklistTipo | null) ?? 'primeiro_escalao')
    );
    this.focoId$ = this.route.queryParamMap.pipe(map((params) => params.get('id')));

    const checklistsView$ = combineLatest([
      this.mockDb.getChecklists(),
      this.mockDb.getViaturas(),
      this.mockDb.getModelosViatura(),
      this.mockDb.getUsuarios(),
      this.statusOverrides$
    ]).pipe(
      map(([checklists, viaturas, modelos, usuarios, overrides]) =>
        checklists.map((checklist: Checklist) => {
          const viatura = viaturas.find((item) => item.id === checklist.viaturaId);
          const modelo = modelos.find((item) => item.id === viatura?.modeloId);
          const motorista = usuarios.find((item) => item.id === checklist.motoristaId);

          return {
            id: checklist.id,
            tipo: checklist.tipo,
            cfn: viatura?.numeroRegistro ?? checklist.viaturaId,
            modelo: modelo?.nomenclatura ?? viatura?.modeloId ?? '-',
            motorista: motorista?.nomeCompleto ?? checklist.motoristaId,
            data: checklist.dataExecucao,
            status: overrides[checklist.id] ?? this.mapStatus(checklist.status)
          };
        })
      )
    );

    this.checklistsPrimeiroEscalao$ = checklistsView$.pipe(
      map((checklists) => checklists.filter((checklist) => checklist.tipo === 'ANTES_PARTIDA'))
    );
    this.checklistsRetorno$ = checklistsView$.pipe(
      map((checklists) => checklists.filter((checklist) => checklist.tipo === 'RETORNO'))
    );
  }

  aprovar(item: ChecklistValidacao): void {
    this.setStatus(item.id, 'Aprovado');
  }

  reprovar(item: ChecklistValidacao): void {
    this.setStatus(item.id, 'Inconsistencia Detectada');
  }

  isItemEmFoco(item: ChecklistValidacao, focoId: string | null): boolean {
    return !!focoId && item.id === focoId;
  }

  private setStatus(id: string, status: string): void {
    this.statusOverrides$.next({ ...this.statusOverrides$.value, [id]: status });
  }

  private mapStatus(status: string): string {
    return status === 'Pendente' ? 'Aguardando Conferencia' : status;
  }
}
