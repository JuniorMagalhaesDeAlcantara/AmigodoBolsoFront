import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TitulosComponent } from './titulos/titulos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CentroCustoComponent } from './centro-custo/centro-custo.component';
import { GraficoCentrocustoComponent } from './grafico-centrocusto/grafico-centrocusto.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'titulos', component: TitulosComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'centrocusto', component: CentroCustoComponent, canActivate: [AuthGuard] },
  { path: 'grafico', component: GraficoCentrocustoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
