import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  ChecklistTipo,
  ChecklistValidacao,
  ControladorExpedicaoMockService
} from '../../../core/services/controlador-expedicao-mock.service';

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

  constructor(
    private readonly controladorService: ControladorExpedicaoMockService,
    private readonly route: ActivatedRoute
  ) {
    this.focoTipo$ = this.route.queryParamMap.pipe(
      map((params) => (params.get('tipo') as ChecklistTipo | null) ?? 'primeiro_escalao')
    );
    this.focoId$ = this.route.queryParamMap.pipe(map((params) => params.get('id')));
    this.checklistsPrimeiroEscalao$ = this.controladorService.checklistsPrimeiroEscalao$;
    this.checklistsRetorno$ = this.controladorService.checklistsRetorno$;
  }

  aprovar(item: ChecklistValidacao): void {
    this.controladorService.aprovarChecklist(item.id);
  }

  reprovar(item: ChecklistValidacao): void {
    this.controladorService.reprovarChecklist(item.id);
  }

  isItemEmFoco(item: ChecklistValidacao, focoId: string | null): boolean {
    return !!focoId && item.id === focoId;
  }
}
