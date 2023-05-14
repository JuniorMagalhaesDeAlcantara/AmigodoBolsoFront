import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitulosComponent } from './titulos/titulos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CentroCustoComponent } from './centro-custo/centro-custo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficoCentrocustoComponent } from './grafico-centrocusto/grafico-centrocusto.component';
import { DicasParaOBolsoComponent } from './dicas-para-o-bolso/dicas-para-o-bolso.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TitulosComponent,
    UsuarioComponent,
    CadastroUsuarioComponent,
    CentroCustoComponent,
    GraficoCentrocustoComponent,
    DicasParaOBolsoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
