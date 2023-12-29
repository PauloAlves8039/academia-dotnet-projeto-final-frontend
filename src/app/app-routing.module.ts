import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'enderecos', component: ListEnderecosComponent },
  { path: 'create-endereco', component: CreateEnderecoComponent },
  { path: 'update-endereco/:codigoEndereco', component: UpdateEnderecoComponent },
  { path: 'clientes', component: ListClientesComponent },
  { path: 'create-cliente', component: CreateClienteComponent },
  { path: 'update-cliente/:codigoCliente', component: UpdateClienteComponent },
  { path: 'veiculos', component: ListVeiculosComponent },
  { path: 'create-veiculo', component: CreateVeiculoComponent },
  { path: 'update-veiculo/:codigoVeiculo', component: UpdateVeiculoComponent },
  { path: 'clientes-veiculos', component: ListClienteVeiculoComponent },
  { path: 'create-cliente-veiculo', component: CreateClienteVeiculoComponent },
  { path: 'update-cliente-veiculo/:codigoClienteVeiculo', component: UpdateClienteVeiculoComponent },
  { path: 'permanencias', component: ListPermanenciasComponent },
  { path: 'create-permanencia', component: CreatePermanenciaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
