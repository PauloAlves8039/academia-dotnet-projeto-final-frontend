import { Component, OnInit } from '@angular/core';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Cliente } from '../../../models/cliente/Cliente';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { ClienteVeiculo } from '../../../models/clienteVeiculo/ClienteVeiculo';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

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
    private router: Router,
    public alertService: AlertService,
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

        await this.clienteVeiculoService.addClienteVeiculo(this.clienteVeiculo);

        this.alertService.mostrarAlerta('Cliente e Veículo associados com sucesso!');
        this.limparCamposClienteVeiculo();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao associar Cliente e Veículo: ${error}`, false);
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
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar Clientes: ${error}`, false);
    }
  }

  private async carregarVeiculos() {
    try {
      this.veiculos = await this.veiculoService.getVeiculos();
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar Veículos: ${error}`, false);
    }
  }

}
