import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-list-veiculos',
  templateUrl: './list-veiculos.component.html',
  styleUrls: ['./list-veiculos.component.css'],
})
export class ListVeiculosComponent implements OnInit {
  veiculos: any[] = [];
  veiculosFiltrados: any[] = [];
  termoDePesquisaVeiculo: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    public alertService: AlertService) {}

  ngOnInit() {
    this.getAllVeiculos();
  }

  trocarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarVeiculosFiltrados();
  }

  getAllVeiculos() {
    this.veiculoService.getVeiculos().then((data) => {
      this.veiculos = data;
      this.veiculosFiltrados = data;
      this.pesquisarVeiculos();
    });
  }

  pesquisarVeiculos() {
    if (this.termoDePesquisaVeiculo.trim() !== '') {
      this.veiculosFiltrados = this.veiculos.filter(veiculo =>
        veiculo.marca.toLowerCase().includes(this.termoDePesquisaVeiculo.toLowerCase()) ||
        veiculo.modelo.includes(this.termoDePesquisaVeiculo)
      );

      this.totalDePaginas = Math.max(1, Math.ceil(this.veiculosFiltrados.length / this.itensPorPagina));
      this.paginaAtual = 1;
    } else {
      this.veiculosFiltrados = this.veiculos.slice(0, this.itensPorPagina);
      this.totalDePaginas = Math.max(1, Math.ceil(this.veiculos.length / this.itensPorPagina));
      this.paginaAtual = 1;
    }
  }

  atualizarVeiculosFiltrados() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = indiceInicial + this.itensPorPagina;
    this.veiculosFiltrados = this.veiculos.slice(indiceInicial, indiceFinal);
  }

  async excluirVeiculo(codigoVeiculo: number) {
    alert('Atenção! Verifique se este Veículo esta vinculado a uma Associação entre Cliente e Veículo.');
    const confirmacao = confirm('Deseja realmente excluir este Veículo?');

    if (confirmacao) {
      try {
        await this.veiculoService.deleteVeiculo(codigoVeiculo);
        this.alertService.mostrarAlerta('Veículo excluído com sucesso!');

        this.getAllVeiculos();
      } catch (error) {
        this.alertService.mostrarAlerta(`Erro ao excluir Veiculo: ${error}`, false);
      }
    }
  }

  limparCampoPesquisa() {
    this.termoDePesquisaVeiculo = '';
    this.getAllVeiculos();
  }

  abrirCadastroDoVeiculo() {
    this.router.navigate(['/create-veiculo']);
  }

  editarVeiculo(codigoVeiculo: number) {
    this.router.navigate([`/update-veiculo/${codigoVeiculo}`]);
  }
}
