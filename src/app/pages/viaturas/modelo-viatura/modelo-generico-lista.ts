import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ModeloGenericoRegistro = {
  sigla: string;
  descricao: string;
};

@Component({
  selector: 'app-modelo-generico-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelo-generico-lista.html',
  styleUrls: ['./modelo-generico-lista.css']
})
export class ModeloGenericoListaComponent {
  readonly registros: ModeloGenericoRegistro[] = [
    { sigla: 'MCL POL MCL', descricao: 'Motocicleta Policia' },
    { sigla: 'VtrTE 10 Ton', descricao: 'Viatura Transporte Especializado 10 toneladas' },
    { sigla: 'VtrTE 5 Ton BAS', descricao: 'Viatura Transporte Especializado 5 toneladas Basculante' },
    { sigla: 'VtrTE 5 Ton', descricao: 'Viatura Transporte Especializado 5 toneladas' },
    { sigla: 'VtrTE 5 Ton CIST C', descricao: 'Viatura Transporte Especializado 5 toneladas Cisterna Combustivel' },
    { sigla: 'VtrTE 5 Ton CIST A', descricao: 'Viatura Transporte Especializado 5 toneladas Cisterna Agua' },
    { sigla: 'VtrTE 5 Ton FRG', descricao: 'Viatura Transporte Especializado 5 toneladas Frigorifico' },
    { sigla: 'VtrTE 5 Ton CAV MEC', descricao: 'Viatura Transporte Especializado 5 toneladas Cavalo Mecanico' },
    { sigla: 'VtrTE 5 Ton LAN EST', descricao: 'Viatura Transporte Especializado 5 toneladas Lancamento de Esteira' },
    { sigla: 'VtrTE 5 Ton PRTD', descricao: 'Viatura Transporte Especializado 5 toneladas Portada' },
    { sigla: 'VtrTE 5 Ton OFN AUT', descricao: 'Viatura Transporte Especializado 5 toneladas Oficina de Autos' },
    { sigla: 'VtrTE 7 Ton SOC', descricao: 'Viatura Transporte Especializado 7 toneladas Socorro' },
    { sigla: 'VtrTNE 2 1/2 Ton', descricao: 'Viatura para Transporte nao especializado capacidade duas e meia toneladas' },
    { sigla: 'VtrTNE 5 Ton', descricao: 'Viatura para Transporte nao especializado capacidade 5 toneladas' },
    { sigla: 'VtrBldTNE SL TP', descricao: 'Viatura Blindada para Transporte nao especializado sobre lagartas Transporte' }
  ];

  descricao = '';
  sigla = '';
  showActionButtons = false;
  showAdvancedFilters = false;

  get filteredRegistros(): ModeloGenericoRegistro[] {
    const descricao = this.descricao.trim().toLowerCase();
    const sigla = this.sigla.trim().toLowerCase();

    return this.registros.filter((registro) => {
      const matchDescricao = !descricao || registro.descricao.toLowerCase().includes(descricao);
      const matchSigla = !sigla || registro.sigla.toLowerCase().includes(sigla);
      return matchDescricao && matchSigla;
    });
  }

  clearFilters(): void {
    this.descricao = '';
    this.sigla = '';
  }

  toggleActionButtons(): void {
    this.showActionButtons = !this.showActionButtons;
  }

  toggleAdvancedFilters(event?: Event): void {
    event?.preventDefault();
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }
}
