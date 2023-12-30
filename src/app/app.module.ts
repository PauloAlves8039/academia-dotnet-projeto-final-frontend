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
import { PaginacaoComponent } from './shared/components/paginacao/paginacao/paginacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PaginacaoComponent,
    RealBrasileiroPipe,
    FormatoDataBasicoPipe,
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
