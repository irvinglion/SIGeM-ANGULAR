import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  readonly resumo = {
    viatura: 'CFN 44311552',
    pagina: '001',
    odometro: '117547',
    totalHHGastos: '0',
    dataEscrituracao: '08/02/2018 11:42:08'
  };

  readonly eventos: EventoRegistro[] = [
    {
      evento: 'Manutenção',
      documentoReferencia: 'OSM Nº27/2017',
      descricaoSumaria: 'RBS - VtrTNE 3/4 Ton 4x4 LAND ROVER DEFENDER 110',
      dataEvento: '08/02/2018',
      concluido: 'Não',
      hh: '0'
    },
    {
      evento: 'Abastecimento',
      documentoReferencia: 'ABT Nº102/2018',
      descricaoSumaria: 'Abastecimento operacional da viatura antes do deslocamento',
      dataEvento: '09/02/2018',
      concluido: 'Sim',
      hh: '1'
    },
    {
      evento: 'Vistoria',
      documentoReferencia: 'VST Nº014/2018',
      descricaoSumaria: 'Conferência geral dos itens de segurança e documentação',
      dataEvento: '10/02/2018',
      concluido: 'Sim',
      hh: '2'
    }
  ];

  readonly emptyRows = Array.from({ length: 5 });
}
