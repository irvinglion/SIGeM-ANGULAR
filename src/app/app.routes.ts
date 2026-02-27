import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboards/dashboard-home/dashboard-home';
import { RegistrarSaidaComponent } from './pages/movimentacoes-operacoes/registrar-saida/registrar-saida';
import { CriarOrdemMovimentacaoComponent } from './pages/movimentacoes-operacoes/criar-ordem-movimentacao/criar-ordem-movimentacao';
import { RegistrarRetornoComponent } from './pages/movimentacoes-operacoes/registrar-retorno/registrar-retorno';
import { ChecklistPrimeiroEscalaoComponent } from './pages/checklists/primeiro-escalao/checklist-primeiro-escalao';
import { ChecklistRetornoComponent } from './pages/checklists/retorno/checklist-retorno';
import { PlaceholderPageComponent } from './pages/placeholder/placeholder-page';

export const routes: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: 'ciclo/restricao', component: PlaceholderPageComponent, data: { title: 'Registrar Restricao Operacional' } },
  { path: 'ciclo/disponibilidade', component: PlaceholderPageComponent, data: { title: 'Consultar Disponibilidade' } },
  { path: 'ciclo/registrar-disponibilidade', component: PlaceholderPageComponent, data: { title: 'Registrar Disponibilidade da Viatura' } },
  { path: 'ciclo/incorporacao', component: PlaceholderPageComponent, data: { title: 'Registrar Incorporacao/Transferencia' } },
  { path: 'livro/evento', component: PlaceholderPageComponent, data: { title: 'Registrar Evento' } },
  { path: 'livro/ocorrencia', component: PlaceholderPageComponent, data: { title: 'Registrar Ocorrencia' } },
  { path: 'livro/consultar-eventos', component: PlaceholderPageComponent, data: { title: 'Consultar Eventos' } },
  { path: 'livro/mobiliamento', component: PlaceholderPageComponent, data: { title: 'Registrar Mobiliamento' } },
  { path: 'viaturas/cadastro', component: PlaceholderPageComponent, data: { title: 'Cadastrar Viatura' } },
  { path: 'viaturas/editar', component: PlaceholderPageComponent, data: { title: 'Editar Viatura' } },
  { path: 'viaturas/historico', component: PlaceholderPageComponent, data: { title: 'Historico de Viatura' } },
  { path: 'viaturas/documentos', component: PlaceholderPageComponent, data: { title: 'Documentos de Viatura' } },
  { path: 'central/modelo-viatura', component: PlaceholderPageComponent, data: { title: 'Cadastrar Modelo de Viatura' } },
  { path: 'central/rotina-manutencao', component: PlaceholderPageComponent, data: { title: 'Cadastrar Rotina de Manutencao' } },
  { path: 'movimentacoes/registrar-saida', component: RegistrarSaidaComponent },
  { path: 'movimentacoes/criar-ordem-movimentacao', component: CriarOrdemMovimentacaoComponent },
  { path: 'movimentacoes/registrar-retorno', component: RegistrarRetornoComponent },
  { path: 'movimentacoes/historico', component: PlaceholderPageComponent, data: { title: 'Historico de Utilizacao' } },
  { path: 'checklists/primeiro-escalao', component: ChecklistPrimeiroEscalaoComponent },
  { path: 'checklists/retorno', component: ChecklistRetornoComponent },
  { path: 'checklists/validacao', component: PlaceholderPageComponent, data: { title: 'Validar Checklist' } },
  { path: 'config/sistema', component: PlaceholderPageComponent, data: { title: 'Configuracoes do Sistema' } },
  { path: 'config/usuario', component: PlaceholderPageComponent, data: { title: 'Configuracoes de Usuario' } },
  { path: 'config/backup', component: PlaceholderPageComponent, data: { title: 'Configuracoes de Backup' } },
  { path: 'logout', component: PlaceholderPageComponent, data: { title: 'Sair' } },
  { path: '**', redirectTo: '' }
];
