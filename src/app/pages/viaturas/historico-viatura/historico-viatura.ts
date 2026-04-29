import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import {
  HistoricoViatura as HistoricoViaturaMock,
  MockDatabaseService,
  OM,
  ResponsavelViatura,
  Usuario,
  Viatura
} from '../../../core/services/mock-database.service';

type ResponsavelHistorico = {
  nome: string;
  funcao: string;
  periodoInicio: string;
  periodoFim: string;
  om: string;
  status: string;
};

type UsoViatura = {
  data: string;
  missao: string;
  origem: string;
  destino: string;
  motorista: string;
  ordem: string;
  situacao: string;
};

type EstadoFluxo = 'done' | 'active' | 'blocked' | 'pending';

type EtapaHistorico = {
  titulo: string;
  descricao: string;
  horario: string;
  estado: EstadoFluxo;
  icone: string;
};

type EventoOperacional = {
  tipo: string;
  titulo: string;
  descricao: string;
  data: string;
  responsavel: string;
  estado: EstadoFluxo;
};

type ViaturaHistorico = {
  id: string;
  numeroRegistro: string;
  modelo: string;
  omAtual: string;
  ultimoUso: string;
  statusUso: string;
  estadoOperacional: string;
  progresso: number;
  motoristaAtual: string;
  ordemAtual: string;
  destinoAtual: string;
  alerta: string;
  historicoUso: UsoViatura[];
  historicoEncarregados: ResponsavelHistorico[];
  etapas: EtapaHistorico[];
  eventos: EventoOperacional[];
};

@Component({
  selector: 'app-historico-viatura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico-viatura.html',
  styleUrls: ['./historico-viatura.css']
})
export class HistoricoViaturaComponent {
  pesquisa = '';
  filtroEstado = 'todos';
  selectedViaturaId = '';
  viaturas: ViaturaHistorico[] = [];

  readonly filtrosEstado = [
    { label: 'Todos', value: 'todos' },
    { label: 'Disponiveis', value: 'Disponivel' },
    { label: 'Em operacao', value: 'Em operacao' },
    { label: 'Em manutencao', value: 'Em manutencao' }
  ];

  constructor(private readonly mockDb: MockDatabaseService) {
    combineLatest([
      this.mockDb.getViaturas(),
      this.mockDb.getModelosViatura(),
      this.mockDb.getOms(),
      this.mockDb.getHistoricoViatura(),
      this.mockDb.getResponsaveisViatura(),
      this.mockDb.getUsuarios(),
      this.mockDb.getOrdensSaida(),
      this.mockDb.getOrdensRetorno(),
      this.mockDb.getChecklists(),
      this.mockDb.getRestricoes()
    ]).subscribe(([viaturas, modelos, oms, historicos, responsaveis, usuarios, saidas, retornos, checklists, restricoes]) => {
      this.viaturas = viaturas.map((viatura: Viatura, index) => {
        const modelo = modelos.find((item) => item.id === viatura.modeloId);
        const usos = historicos.filter((historico) => historico.viaturaId === viatura.id);
        const encarregados = responsaveis.filter((responsavel) => responsavel.viaturaId === viatura.id);
        const saida = saidas.find((item) => item.viaturaId === viatura.id);
        const retorno = retornos.find((item) => item.ordemSaidaId === saida?.id);
        const checklist = checklists.find((item) => item.viaturaId === viatura.id);
        const restricao = restricoes.find((item) => item.viaturaId === viatura.id);
        const motoristaAtual = this.findUsuarioLabel(usuarios, saida?.motoristaId ?? usos[0]?.motoristaId ?? '');
        const progressData = this.buildProgress(index, viatura.statusUso, checklist?.status ?? '', !!retorno, !!restricao);

        return {
          id: viatura.id,
          numeroRegistro: viatura.numeroRegistro,
          modelo: modelo?.nomenclatura ?? viatura.modeloId,
          omAtual: this.findOmLabel(oms, viatura.omAtualId),
          ultimoUso: usos[usos.length - 1]?.data ?? '-',
          statusUso: viatura.statusUso,
          estadoOperacional: progressData.estadoOperacional,
          progresso: progressData.progresso,
          motoristaAtual: motoristaAtual || 'Sem motorista atribuido',
          ordemAtual: saida?.numeroOrdem ?? 'Sem ordem ativa',
          destinoAtual: saida?.destino ?? 'Sem destino previsto',
          alerta: restricao?.descricao ?? progressData.alerta,
          historicoUso: usos.map((uso: HistoricoViaturaMock) => ({
            data: uso.data,
            missao: uso.missao,
            origem: this.findOmLabel(oms, uso.origem),
            destino: uso.destino,
            motorista: this.findUsuarioLabel(usuarios, uso.motoristaId),
            ordem: uso.ordemSaidaId,
            situacao: retorno ? 'Encerrada' : 'Em acompanhamento'
          })),
          historicoEncarregados: encarregados.map((responsavel: ResponsavelViatura) => ({
            nome: `${responsavel.postoGrad} ${responsavel.nomeGuerra}`,
            funcao: 'Encarregado da viatura',
            periodoInicio: responsavel.dataInicio,
            periodoFim: responsavel.dataTermino,
            om: this.findOmLabel(oms, responsavel.omId),
            status: responsavel.dataTermino ? 'Encerrado' : 'Ativo'
          })),
          etapas: this.buildEtapas(viatura.statusUso, checklist?.status ?? '', !!retorno, !!restricao),
          eventos: this.buildEventos(viatura.statusUso, saida?.numeroOrdem ?? '', checklist?.status ?? '', retorno?.id ?? '', restricao?.descricao ?? '')
        };
      });

      this.selectedViaturaId = this.viaturas[0]?.id ?? '';
    });
  }

  get filteredViaturas(): ViaturaHistorico[] {
    const filtro = this.pesquisa.trim().toLowerCase();

    return this.viaturas.filter((viatura) => {
      const matchesText =
        !filtro ||
        viatura.numeroRegistro.toLowerCase().includes(filtro) ||
        viatura.modelo.toLowerCase().includes(filtro) ||
        viatura.omAtual.toLowerCase().includes(filtro) ||
        viatura.ordemAtual.toLowerCase().includes(filtro) ||
        viatura.motoristaAtual.toLowerCase().includes(filtro);
      const matchesEstado = this.filtroEstado === 'todos' || viatura.statusUso === this.filtroEstado;

      return matchesText && matchesEstado;
    });
  }

  get selectedViatura(): ViaturaHistorico | undefined {
    return this.filteredViaturas.find((viatura) => viatura.id === this.selectedViaturaId) ?? this.filteredViaturas[0];
  }

  get totalViaturas(): number {
    return this.viaturas.length;
  }

  get viaturasEmOperacao(): number {
    return this.viaturas.filter((viatura) => viatura.statusUso === 'Em operacao').length;
  }

  get viaturasComAlerta(): number {
    return this.viaturas.filter((viatura) => viatura.alerta).length;
  }

  get taxaConclusao(): number {
    if (!this.viaturas.length) {
      return 0;
    }

    const total = this.viaturas.reduce((sum, viatura) => sum + viatura.progresso, 0);
    return Math.round(total / this.viaturas.length);
  }

  selectViatura(id: string): void {
    this.selectedViaturaId = id;
  }

  clearPesquisa(): void {
    this.pesquisa = '';
    this.filtroEstado = 'todos';
  }

  getStatusClass(status: string): string {
    if (status === 'Em manutencao') {
      return 'is-warning';
    }

    if (status === 'Em operacao') {
      return 'is-info';
    }

    return 'is-success';
  }

  trackById(_: number, item: { id?: string; titulo?: string }): string {
    return item.id ?? item.titulo ?? '';
  }

  private buildProgress(index: number, status: string, checklistStatus: string, hasRetorno: boolean, hasRestricao: boolean) {
    if (hasRestricao || status === 'Em manutencao') {
      return {
        progresso: 32,
        estadoOperacional: 'Bloqueada para nova ordem',
        alerta: hasRestricao ? 'Restricao operacional ativa' : 'Manutencao pendente'
      };
    }

    if (hasRetorno) {
      return {
        progresso: 100,
        estadoOperacional: 'Ordem encerrada',
        alerta: ''
      };
    }

    if (status === 'Em operacao') {
      return {
        progresso: 76,
        estadoOperacional: 'Viatura em operacao',
        alerta: ''
      };
    }

    if (checklistStatus === 'Pendente') {
      return {
        progresso: 48,
        estadoOperacional: 'Aguardando validacao',
        alerta: 'Checklist pendente de conferencia'
      };
    }

    return {
      progresso: index === 0 ? 18 : 62,
      estadoOperacional: index === 0 ? 'Disponivel para ordem' : 'Viatura liberada',
      alerta: ''
    };
  }

  private buildEtapas(status: string, checklistStatus: string, hasRetorno: boolean, hasRestricao: boolean): EtapaHistorico[] {
    const blocked = hasRestricao || status === 'Em manutencao';
    const emOperacao = status === 'Em operacao';
    const checklistPendente = checklistStatus === 'Pendente';

    return [
      {
        titulo: 'Ordem criada',
        descricao: 'Gestor definiu missao, periodo e viatura.',
        horario: '08:00',
        estado: blocked ? 'blocked' : 'done',
        icone: 'bi-file-earmark-text'
      },
      {
        titulo: 'Disponibilidade',
        descricao: blocked ? 'Viatura bloqueada por restricao ou manutencao.' : 'Viatura apta para seguir no fluxo.',
        horario: '08:05',
        estado: blocked ? 'blocked' : 'done',
        icone: 'bi-shield-check'
      },
      {
        titulo: 'Checklist 1 Escalao',
        descricao: checklistPendente ? 'Aguardando conferencia do controlador.' : 'Checklist preenchido pelo motorista.',
        horario: '08:20',
        estado: checklistPendente ? 'active' : blocked ? 'pending' : 'done',
        icone: 'bi-clipboard2-check'
      },
      {
        titulo: 'Liberacao',
        descricao: emOperacao || hasRetorno ? 'Viatura liberada para deslocamento.' : 'Aguardando validacao final.',
        horario: '08:40',
        estado: emOperacao || hasRetorno ? 'done' : blocked ? 'pending' : 'active',
        icone: 'bi-unlock'
      },
      {
        titulo: 'Operacao',
        descricao: hasRetorno ? 'Missao executada.' : emOperacao ? 'Viatura em deslocamento.' : 'Sem saida registrada.',
        horario: '09:10',
        estado: hasRetorno ? 'done' : emOperacao ? 'active' : 'pending',
        icone: 'bi-signpost-split'
      },
      {
        titulo: 'Retorno e encerramento',
        descricao: hasRetorno ? 'Retorno validado e ordem encerrada.' : 'Aguardando retorno fisico e validacao.',
        horario: hasRetorno ? '17:20' : '--:--',
        estado: hasRetorno ? 'done' : 'pending',
        icone: 'bi-flag'
      }
    ];
  }

  private buildEventos(
    status: string,
    ordem: string,
    checklistStatus: string,
    retornoId: string,
    restricao: string
  ): EventoOperacional[] {
    const eventos: EventoOperacional[] = [
      {
        tipo: 'Ordem',
        titulo: ordem || 'Fila operacional',
        descricao: ordem ? 'Ordem vinculada ao fluxo da viatura.' : 'Nenhuma ordem ativa encontrada.',
        data: '2026-04-28 08:00',
        responsavel: 'Gestor',
        estado: ordem ? 'done' : 'pending'
      },
      {
        tipo: 'Checklist',
        titulo: checklistStatus === 'Pendente' ? 'Validacao pendente' : 'Checklist registrado',
        descricao: checklistStatus === 'Pendente' ? 'Controlador precisa validar o checklist.' : 'Checklist disponivel para consulta.',
        data: '2026-04-28 08:25',
        responsavel: 'Motorista',
        estado: checklistStatus === 'Pendente' ? 'active' : 'done'
      }
    ];

    if (status === 'Em operacao') {
      eventos.push({
        tipo: 'Operacao',
        titulo: 'Viatura em deslocamento',
        descricao: 'Missao em andamento conforme ordem de saida.',
        data: '2026-04-28 09:10',
        responsavel: 'Controlador',
        estado: 'active'
      });
    }

    if (retornoId) {
      eventos.push({
        tipo: 'Retorno',
        titulo: retornoId,
        descricao: 'Retorno validado e ciclo encerrado.',
        data: '2026-04-28 17:20',
        responsavel: 'Controlador',
        estado: 'done'
      });
    }

    if (restricao) {
      eventos.push({
        tipo: 'Restricao',
        titulo: 'Alerta operacional',
        descricao: restricao,
        data: '2026-04-28 16:10',
        responsavel: 'Controlador',
        estado: 'blocked'
      });
    }

    return eventos;
  }

  private findOmLabel(oms: OM[], idOrLabel: string): string {
    const om = oms.find((item) => item.id === idOrLabel);
    return om ? om.sigla : idOrLabel;
  }

  private findUsuarioLabel(usuarios: Usuario[], id: string): string {
    return usuarios.find((usuario) => usuario.id === id)?.nomeCompleto ?? id;
  }
}
