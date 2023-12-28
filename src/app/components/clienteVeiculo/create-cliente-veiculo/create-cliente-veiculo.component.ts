import { Component, OnInit } from '@angular/core';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Cliente } from '../../../models/cliente/Cliente';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { ClienteVeiculo } from '../../../models/clienteVeiculo/ClienteVeiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cliente-veiculo',
  templateUrl: './create-cliente-veiculo.component.html',
  styleUrls: ['./create-cliente-veiculo.component.css'],
})
export class CreateClienteVeiculoComponent implements OnInit {
  clienteVeiculo: ClienteVeiculo = new ClienteVeiculo();
  clientes: Cliente[] = [];
  veiculos: Veiculo[] = [];

  constructor(
    private clienteVeiculoService: ClienteVeiculoService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarClientes();
    this.carregarVeiculos();
  }

  voltarParaListaClientesVeiculos() {
    this.router.navigate(['/clientes-veiculos']);
  }

  async cadastrarClienteVeiculo() {
    try {
      if (this.validarCamposObrigatorios()) {

        const resposta = await this.clienteVeiculoService.addClienteVeiculo(this.clienteVeiculo);

        alert('Cliente e Veículo vinculados com sucesso: ' + resposta);
        this.limparCamposClienteVeiculo();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao vincular Cliente e Veículo: ' + erro);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.clienteVeiculo.clienteId &&
      !!this.clienteVeiculo.veiculoId
    );
  }

  limparCamposClienteVeiculo() {
    this.clienteVeiculo = new ClienteVeiculo();
  }

  private async carregarClientes() {
    try {
      this.clientes = await this.clienteService.getClientes();
    } catch (erro) {
      console.error('Erro ao carregar clientes: ', erro);
    }
  }

  private async carregarVeiculos() {
    try {
      this.veiculos = await this.veiculoService.getVeiculos();
    } catch (erro) {
      console.error('Erro ao carregar veículos: ', erro);
    }
  }

}
