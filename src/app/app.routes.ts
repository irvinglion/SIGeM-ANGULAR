import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RegistrarSaidaComponent } from './pages/movimentacoes-operacoes/registrar-saida/registrar-saida';
import { CriarOrdemMovimentacaoComponent } from './pages/movimentacoes-operacoes/criar-ordem-movimentacao/criar-ordem-movimentacao';
import { RegistrarRetornoComponent } from './pages/movimentacoes-operacoes/registrar-retorno/registrar-retorno';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'movimentacoes/registrar-saida', component: RegistrarSaidaComponent },
  { path: 'movimentacoes/criar-ordem-movimentacao', component: CriarOrdemMovimentacaoComponent },
  {path:  'movimentacoes/registrar-retorno', component: RegistrarRetornoComponent}
];