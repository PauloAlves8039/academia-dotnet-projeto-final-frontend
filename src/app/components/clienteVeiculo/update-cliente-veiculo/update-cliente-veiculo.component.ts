import { Component, OnInit } from '@angular/core';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteVeiculo } from '../../../models/clienteVeiculo/ClienteVeiculo';
import { Cliente } from '../../../models/cliente/Cliente';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-update-cliente-veiculo',
  templateUrl: './update-cliente-veiculo.component.html',
  styleUrls: ['./update-cliente-veiculo.component.css'],
})
export class UpdateClienteVeiculoComponent implements OnInit {
  clienteVeiculoExistente: ClienteVeiculo = new ClienteVeiculo();
  clientesExistentes: Cliente[] = [];
  veiculosExistentes: Veiculo[] = [];

  constructor(
    private clienteVeiculoService: ClienteVeiculoService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.carregarCodigoClienteVeiculoPelaRota();
    this.carregarClientesExistentes();
    this.carregarVeiculosExistentes();
  }

  async atualizarClienteVeiculo() {
    try {
      if (this.validarCamposObrigatorios()) {

        await this.clienteVeiculoService.updateClienteVeiculo(this.clienteVeiculoExistente);

        this.alertService.mostrarAlerta('Associação entre cliente e veículo atualizada com sucesso!');
        this.limparCamposClienteVeiculo();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (erro) {
    this.alertService.mostrarAlerta(`Erro ao atualziar associação entre cliente e veículo: ${erro}`, false);
    }
  }

  async carregarCodigoClienteVeiculoPelaRota() {
    const codigoClienteVeiculo = this.obterCodigoClienteVeiculoPelaRota();

    if (codigoClienteVeiculo) {
      this.clienteVeiculoExistente = await this.clienteVeiculoService.getClienteVeiculoPorCodigo(codigoClienteVeiculo);
    } else {
      this.alertService.mostrarAlerta('Código da associação cliente e veículo não fornecido na rota.', false);
    }
  }

  voltarParaListaClientesVeiculos() {
    this.router.navigate(['/clientes-veiculos']);
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.clienteVeiculoExistente.clienteId &&
      !!this.clienteVeiculoExistente.veiculoId
    );
  }

  limparCamposClienteVeiculo() {
    this.clienteVeiculoExistente = new ClienteVeiculo();
  }

  private async carregarClientesExistentes() {
    try {
      this.clientesExistentes = await this.clienteService.getClientes();
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar Clientes: ${error}`, false);
    }
  }

  private async carregarVeiculosExistentes() {
    try {
      this.veiculosExistentes = await this.veiculoService.getVeiculos();
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar Veículos: ${error}`, false);
    }
  }

  private obterCodigoClienteVeiculoPelaRota(): number | null {
    const codigoClienteVeiculo = this.route.snapshot.paramMap.get('codigoClienteVeiculo');
    return codigoClienteVeiculo ? +codigoClienteVeiculo : null;
  }
}
