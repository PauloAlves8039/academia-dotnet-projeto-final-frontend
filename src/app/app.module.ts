import { AlertService } from './services/alert/alert.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListEnderecosComponent } from './components/endereco/list-enderecos/list-enderecos.component';
import { CreateEnderecoComponent } from './components/endereco/create-endereco/create-endereco.component';
import { UpdateEnderecoComponent } from './components/endereco/update-endereco/update-endereco.component';
import { ListClientesComponent } from './components/cliente/list-clientes/list-clientes.component';
import { CreateClienteComponent } from './components/cliente/create-cliente/create-cliente.component';
import { UpdateClienteComponent } from './components/cliente/update-cliente/update-cliente.component';
import { ListVeiculosComponent } from './components/veiculo/list-veiculos/list-veiculos.component';
import { CreateVeiculoComponent } from './components/veiculo/create-veiculo/create-veiculo.component';
import { UpdateVeiculoComponent } from './components/veiculo/update-veiculo/update-veiculo.component';
import { ListClienteVeiculoComponent } from './components/clienteVeiculo/list-cliente-veiculo/list-cliente-veiculo.component';
import { CreateClienteVeiculoComponent } from './components/clienteVeiculo/create-cliente-veiculo/create-cliente-veiculo.component';
import { UpdateClienteVeiculoComponent } from './components/clienteVeiculo/update-cliente-veiculo/update-cliente-veiculo.component';
import { ListPermanenciasComponent } from './components/permanencia/list-permanencias/list-permanencias.component';
import { CreatePermanenciaComponent } from './components/permanencia/create-permanencia/create-permanencia.component';
import { RealBrasileiroPipe } from './shared/pipes/moedas/real/RealBrasileiro.pipe';
import { FormatoDataBasicoPipe } from './shared/pipes/formatoDatas/basico/FormatoDataBasico.pipe';
import { PaginacaoComponent } from './shared/components/paginacao/paginacao.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoginComponent } from './components/login/login/login.component';
import { CreateUsuarioComponent } from './components/login/create-usuario/create-usuario.component';
import { DashboardComponent } from './components/dashboard/Dashboard/Dashboard.component';
import { FormatoCpfPipe } from './shared/pipes/formatoCampo/formatoCpf/formatoCpf.pipe';
import { FormatoTelefonePipe } from './shared/pipes/formatoCampo/formatoTelefone/formatoTelefone.pipe';
import { FormatoCepPipe } from './shared/pipes/formatoCampo/formatoCep/formatoCep.pipe';
import { ContatosComponent } from './components/contatos/contatos/contatos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUsuarioComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PaginacaoComponent,
    SpinnerComponent,
    RealBrasileiroPipe,
    FormatoDataBasicoPipe,
    FormatoCpfPipe,
    FormatoCepPipe,
    FormatoTelefonePipe,
    ListEnderecosComponent,
    CreateEnderecoComponent,
    UpdateEnderecoComponent,
    ListClientesComponent,
    CreateClienteComponent,
    UpdateClienteComponent,
    ListVeiculosComponent,
    CreateVeiculoComponent,
    UpdateVeiculoComponent,
    ListClienteVeiculoComponent,
    CreateClienteVeiculoComponent,
    UpdateClienteVeiculoComponent,
    ListPermanenciasComponent,
    CreatePermanenciaComponent,
    DashboardComponent,
    ContatosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
  exports: [
    FormatoCpfPipe,
    FormatoTelefonePipe,
    FormatoCepPipe,
  ],
})
export class AppModule { }
