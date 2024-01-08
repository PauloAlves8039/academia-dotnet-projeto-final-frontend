import { AlertService } from './../../../services/alert/alert.service';
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
  clientesVeiculosFiltrados: any[] = [];
  termoDePesquisaClientesVeiculos: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private clienteVeiculoService: ClienteVeiculoService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private router: Router,
    public alertService: AlertService) {}

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

  trocarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarClientesVeiculosFiltrados();
  }

  getAllClientesVeiculos() {
    this.clienteVeiculoService.getClientesVeiculos().then((data) => {
      this.clientesVeiculos = data;
      this.pesquisarClientesVeiculos();
    });
  }

  pesquisarClientesVeiculos() {
    if (this.termoDePesquisaClientesVeiculos.trim() !== '') {
      this.clientesVeiculosFiltrados = this.clientesVeiculos.filter(clienteVeiculo =>
        this.encontrarNomeDoCliente(clienteVeiculo.clienteId)
          .toLowerCase()
          .includes(this.termoDePesquisaClientesVeiculos.toLowerCase())
      );

      this.totalDePaginas = Math.max(1, Math.ceil(this.clientesVeiculosFiltrados.length / this.itensPorPagina));
      this.paginaAtual = 1;
    } else {
      this.clientesVeiculosFiltrados = this.clientesVeiculos.slice(0, this.itensPorPagina);
      this.totalDePaginas = Math.max(1, Math.ceil(this.clientesVeiculos.length / this.itensPorPagina));
      this.paginaAtual = 1;
    }
  }

  atualizarClientesVeiculosFiltrados() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = indiceInicial + this.itensPorPagina;
    this.clientesVeiculosFiltrados = this.clientesVeiculos.slice(indiceInicial, indiceFinal);
  }

  async excluirClienteVeiculo(codigoClienteVeiculo: number) {
    alert('Atenção! Verifique se esta associação esta vinculada a uma Permanência.');
    const confirmacao = confirm('Deseja realmente excluir esta associação entre Cliente e Veículo?');

    if (confirmacao) {
      try {
        await this.clienteVeiculoService.deleteClienteVeiculo(codigoClienteVeiculo);
        this.alertService.mostrarAlerta(`Associação entre Cliente e Veículo excluída com sucesso!`);

        this.getAllClientesVeiculos();
      } catch (error) {
        this.alertService.mostrarAlerta(`Erro ao excluir associação entre Cliente e Veículo: ${error}`, false);
      }
    }
  }

  limparCampoPesquisa() {
    this.termoDePesquisaClientesVeiculos = '';
    this.getAllClientesVeiculos();
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

  encontrarModeloDoVeiculo(veiculoId: number): string {
    const veiculo = this.veiculos.find((v) => v.codigoVeiculo === veiculoId);
    return veiculo ? veiculo.modelo : 'Veículo não encontrado';
  }
}
