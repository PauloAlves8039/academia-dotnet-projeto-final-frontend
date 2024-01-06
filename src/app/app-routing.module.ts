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
import { LoginComponent } from './components/login/login/login.component';
import { AuthGuard } from './shared/guards/AuthGuard';
import { CreateUsuarioComponent } from './components/login/create-usuario/create-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-usuario', component: CreateUsuarioComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'enderecos', component: ListEnderecosComponent, canActivate: [AuthGuard] },
  { path: 'create-endereco', component: CreateEnderecoComponent, canActivate: [AuthGuard] },
  { path: 'update-endereco/:codigoEndereco', component: UpdateEnderecoComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ListClientesComponent, canActivate: [AuthGuard] },
  { path: 'create-cliente', component: CreateClienteComponent, canActivate: [AuthGuard] },
  { path: 'update-cliente/:codigoCliente', component: UpdateClienteComponent, canActivate: [AuthGuard] },
  { path: 'veiculos', component: ListVeiculosComponent, canActivate: [AuthGuard] },
  { path: 'create-veiculo', component: CreateVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'update-veiculo/:codigoVeiculo', component: UpdateVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'clientes-veiculos', component: ListClienteVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'create-cliente-veiculo', component: CreateClienteVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'update-cliente-veiculo/:codigoClienteVeiculo', component: UpdateClienteVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'permanencias', component: ListPermanenciasComponent, canActivate: [AuthGuard] },
  { path: 'create-permanencia', component: CreatePermanenciaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
