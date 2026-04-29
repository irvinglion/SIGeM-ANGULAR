import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export type MockRecord = Record<string, string>;
export type MockDatabase = Record<string, MockRecord[]>;

export type Perfil = MockRecord & { id: string; nome: string; permissoes: string };
export type OM = MockRecord & { id: string; codigo: string; sigla: string; descricao: string };
export type Usuario = MockRecord & {
  id: string;
  nip: string;
  nomeCompleto: string;
  perfilId: string;
  omId: string;
  email: string;
  telefone: string;
  ativo: string;
};
export type Fabricante = MockRecord & {
  id: string;
  codigo: string;
  sigla: string;
  nome: string;
  pais: string;
  cnpjOuIdentificador: string;
  ativo: string;
};
export type ModeloViatura = MockRecord & {
  id: string;
  codeq: string;
  neb: string;
  nomenclatura: string;
  modeloGenerico: string;
  versao: string;
  fabricanteId: string;
  tracao: string;
  numeroRodas: string;
  tipoViatura: string;
  emprego: string;
  vidaUtil: string;
  rotinaManutencao: string;
  rotinaLubrificacao: string;
};
export type Viatura = MockRecord & {
  id: string;
  grupoSequencial: string;
  numeroRegistro: string;
  numeroPatrimonial: string;
  chassi: string;
  numeroMotor: string;
  anoFabricacao: string;
  fimCiclo: string;
  modeloId: string;
  omAtualId: string;
  omDestaqueId: string;
  statusUso: string;
};
export type OrdemMovimentacao = MockRecord & {
  id: string;
  numeroOrdem: string;
  tipo: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  omResponsavelId: string;
  registradoPorId: string;
  operacaoNome: string;
  operacaoSigla: string;
  tipoOperacao: string;
};
export type OrdemSaida = MockRecord & {
  id: string;
  numeroOrdem: string;
  data: string;
  destino: string;
  missao: string;
  referencia: string;
  horaSaidaPlanejada: string;
  hodometroSaida: string;
  liberadoAs: string;
  motoristaId: string;
  controladorId: string;
  utilizadorId: string;
  viaturaId: string;
  ordemMovimentacaoId: string;
};
export type OrdemRetorno = MockRecord & {
  id: string;
  data: string;
  horaRetorno: string;
  hodometroRetorno: string;
  observacoesFinais: string;
  irregularidades: string;
  motoristaId: string;
  controladorId: string;
  ordemSaidaId: string;
};
export type Checklist = MockRecord & {
  id: string;
  tipo: string;
  dataExecucao: string;
  ordemSaidaId: string;
  ordemRetornoId: string;
  viaturaId: string;
  motoristaId: string;
  status: string;
  irregularidades: string;
};
export type ChecklistItem = MockRecord & {
  id: string;
  checklistId: string;
  descricao: string;
  status: string;
  observacao: string;
};
export type HistoricoViatura = MockRecord & {
  id: string;
  viaturaId: string;
  data: string;
  missao: string;
  origem: string;
  destino: string;
  motoristaId: string;
  ordemSaidaId: string;
  ordemRetornoId: string;
};
export type ResponsavelViatura = MockRecord & {
  id: string;
  viaturaId: string;
  nip: string;
  postoGrad: string;
  nomeGuerra: string;
  dataInicio: string;
  dataTermino: string;
  omId: string;
};
export type LivroRegistroViatura = MockRecord & {
  id: string;
  viaturaId: string;
  pagina: string;
  odometro: string;
  horimetro: string;
  dataEscrituracao: string;
  descricaoEvento: string;
  tipoEvento: string;
  responsavelId: string;
};
export type Disponibilidade = MockRecord & {
  id: string;
  viaturaId: string;
  dataInicio: string;
  dataTermino: string;
  situacao: string;
  detalhe: string;
  registradoPorId: string;
};
export type Restricao = MockRecord & {
  id: string;
  viaturaId: string;
  sigla: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  responsavelId: string;
};
export type MobiliamentoOperativo = MockRecord & {
  id: string;
  viaturaId: string;
  equipamentos: string;
  estaDisponivel: string;
  dataInicio: string;
  dataTermino: string;
  observacao: string;
  registradoPorId: string;
};

@Injectable({ providedIn: 'root' })
export class MockDatabaseService {
  private readonly http = inject(HttpClient);
  private readonly database$ = this.http
    .get('mock-db-sigem.txt', { responseType: 'text' })
    .pipe(map((text) => this.parse(text)), shareReplay(1));

  getUsuarios(): Observable<Usuario[]> {
    return this.table<Usuario>('USUARIOS');
  }

  getPerfis(): Observable<Perfil[]> {
    return this.table<Perfil>('PERFIS');
  }

  getOms(): Observable<OM[]> {
    return this.table<OM>('OMS');
  }

  getViaturas(): Observable<Viatura[]> {
    return this.table<Viatura>('VIATURAS');
  }

  getModelosViatura(): Observable<ModeloViatura[]> {
    return this.table<ModeloViatura>('MODELOS_VIATURA');
  }

  getFabricantes(): Observable<Fabricante[]> {
    return this.table<Fabricante>('FABRICANTES');
  }

  getOrdensMovimentacao(): Observable<OrdemMovimentacao[]> {
    return this.table<OrdemMovimentacao>('ORDENS_MOVIMENTACAO');
  }

  getOrdensSaida(): Observable<OrdemSaida[]> {
    return this.table<OrdemSaida>('ORDENS_SAIDA');
  }

  getOrdensRetorno(): Observable<OrdemRetorno[]> {
    return this.table<OrdemRetorno>('ORDENS_RETORNO');
  }

  getChecklists(): Observable<Checklist[]> {
    return this.table<Checklist>('CHECKLISTS');
  }

  getChecklistItens(): Observable<ChecklistItem[]> {
    return this.table<ChecklistItem>('CHECKLIST_ITENS');
  }

  getHistoricoViatura(): Observable<HistoricoViatura[]> {
    return this.table<HistoricoViatura>('HISTORICO_VIATURA');
  }

  getResponsaveisViatura(): Observable<ResponsavelViatura[]> {
    return this.table<ResponsavelViatura>('RESPONSAVEIS_VIATURA');
  }

  getLivroRegistroViatura(): Observable<LivroRegistroViatura[]> {
    return this.table<LivroRegistroViatura>('LIVRO_REGISTRO_VIATURA');
  }

  getDisponibilidade(): Observable<Disponibilidade[]> {
    return this.table<Disponibilidade>('DISPONIBILIDADE');
  }

  getRestricoes(): Observable<Restricao[]> {
    return this.table<Restricao>('RESTRICOES');
  }

  getMobiliamentoOperativo(): Observable<MobiliamentoOperativo[]> {
    return this.table<MobiliamentoOperativo>('MOBILIAMENTO_OPERATIVO');
  }

  getDatabase(): Observable<MockDatabase> {
    return this.database$;
  }

  private table<T extends MockRecord>(name: string): Observable<T[]> {
    return this.database$.pipe(map((database) => (database[name] ?? []) as T[]));
  }

  private parse(text: string): MockDatabase {
    const database: MockDatabase = {};
    let currentSection = '';
    let headers: string[] = [];

    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line) {
        continue;
      }

      const sectionMatch = line.match(/^\[([A-Z0-9_]+)\]$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        database[currentSection] = [];
        headers = [];
        continue;
      }

      if (!currentSection) {
        continue;
      }

      const cells = line.split(';').map((cell) => cell.trim());
      if (headers.length === 0) {
        headers = cells;
        continue;
      }

      const record = headers.reduce<MockRecord>((acc, header, index) => {
        acc[header] = cells[index] ?? '';
        return acc;
      }, {});

      database[currentSection].push(record);
    }

    return database;
  }
}
