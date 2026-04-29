import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { LivroRegistroViatura, MockDatabaseService } from '../../../core/services/mock-database.service';

type EventoRegistro = {
  evento: string;
  documentoReferencia: string;
  descricaoSumaria: string;
  dataEvento: string;
  concluido: string;
  hh: string;
};

@Component({
  selector: 'app-consultar-eventos-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-eventos-detalhe.html',
  styleUrls: ['./consultar-eventos-detalhe.css']
})
export class ConsultarEventosDetalheComponent {
  resumo = {
    viatura: '',
    pagina: '',
    odometro: '',
    totalHHGastos: '',
    dataEscrituracao: ''
  };

  eventos: EventoRegistro[] = [];

  readonly emptyRows = Array.from({ length: 5 });

  constructor(
    private readonly mockDb: MockDatabaseService,
    private readonly route: ActivatedRoute
  ) {
    combineLatest([this.mockDb.getLivroRegistroViatura(), this.mockDb.getViaturas()]).subscribe(([registros, viaturas]) => {
      const id = this.route.snapshot.paramMap.get('id');
      const registro = registros.find((item) => item.id === id) ?? registros[0];

      if (!registro) {
        return;
      }

      const viatura = viaturas.find((item) => item.id === registro.viaturaId);

      this.resumo = {
        viatura: viatura?.numeroRegistro ?? registro.viaturaId,
        pagina: registro.pagina,
        odometro: registro.odometro,
        totalHHGastos: registro.horimetro,
        dataEscrituracao: registro.dataEscrituracao
      };
      this.eventos = registros
        .filter((item: LivroRegistroViatura) => item.viaturaId === registro.viaturaId)
        .map((item: LivroRegistroViatura) => ({
          evento: item.tipoEvento,
          documentoReferencia: item.id,
          descricaoSumaria: item.descricaoEvento,
          dataEvento: item.dataEscrituracao,
          concluido: 'Sim',
          hh: item.horimetro
        }));
    });
  }
}
