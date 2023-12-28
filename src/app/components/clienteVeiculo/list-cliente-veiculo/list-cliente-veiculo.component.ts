import { Component, OnInit } from '@angular/core';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';

@Component({
  selector: 'app-list-cliente-veiculo',
  templateUrl: './list-cliente-veiculo.component.html',
  styleUrls: ['./list-cliente-veiculo.component.css'],
})
export class ListClienteVeiculoComponent implements OnInit {
  clientesVeiculos!: any[];
  clientes: any[] = [];
  veiculos: any[] = [];

  constructor(
    private clienteVeiculoService: ClienteVeiculoService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private router: Router) {}

  ngOnInit() {
    this.getAllClientesVeiculos();
    this.getAllClientes();
    this.getAllVeiculos();
  }

  abrirCadastroDeClienteVeiculo() {
    this.router.navigate(['/create-cliente-veiculo']);
  }

  editarClienteVeiculo(codigoClienteVeiculo: number) {
    this.router.navigate([`/update-cliente-veiculo/${codigoClienteVeiculo}`]);
  }

  getAllClientesVeiculos() {
    this.clienteVeiculoService.getClientesVeiculos().then((data) => {
      this.clientesVeiculos = data;
    });
  }

  getAllClientes() {
    this.clienteService.getClientes().then((data) => {
      this.clientes = data;
    });
  }

  getAllVeiculos() {
    this.veiculoService.getVeiculos().then((data) => {
      this.veiculos = data;
    });
  }

  encontrarNomeDoCliente(clienteId: number): string {
    const cliente = this.clientes.find((c) => c.codigoCliente === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  }

  encontrarMarcaDoVeiculo(veiculoId: number): string {
    const veiculo = this.veiculos.find((v) => v.codigoVeiculo === veiculoId);
    return veiculo ? veiculo.marca : 'Veículo não encontrado';
  }
}
