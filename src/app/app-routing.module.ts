import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ListEnderecosComponent } from './components/endereco/list-enderecos/list-enderecos.component';
import { CreateEnderecoComponent } from './components/endereco/create-endereco/create-endereco.component';
import { UpdateEnderecoComponent } from './components/endereco/update-endereco/update-endereco.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'enderecos', component: ListEnderecosComponent },
  { path: 'create-endereco', component: CreateEnderecoComponent },
  { path: 'update-endereco/:codigoEndereco', component: UpdateEnderecoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
