import { Component, OnInit } from '@angular/core';
import { PermanenciaService } from '../../../services/permanencia/permanencia.service';
import { Router } from '@angular/router';
import { Permanencia } from '../../../models/permanencia/Permanencia';
import jsPDF from 'jspdf';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-list-permanencias',
  templateUrl: './list-permanencias.component.html',
  styleUrls: ['./list-permanencias.component.css'],
})
export class ListPermanenciasComponent implements OnInit {
  permanencia: Permanencia = new Permanencia();
  permanencias!: any[];
  clientesVeiculos!: any[];
  codigosClientesVeiculos: any[] = [];
  permanenciasFiltradas: any[] = [];
  termoDePesquisaPermanencia: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private permanenciaService: PermanenciaService,
    private clienteVeiculoService: ClienteVeiculoService,
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.getAllPermanencias();
    this.carregarCodigosClienteVeiculo();
  }

  trocarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarPermanenciasFiltradas();
  }

  abrirCadastroDePermanencia() {
    this.router.navigate(['/create-permanencia']);
  }

  getAllPermanencias() {
    this.permanenciaService.getPermanencias().then((data) => {
      this.permanencias = data;
      this.pesquisarPermanencias();
    });
  }

  async carregarCodigosClienteVeiculo() {
    try {
      const clienteVeiculos = await this.clienteVeiculoService.getClientesVeiculos();

      if (clienteVeiculos) {
        this.codigosClientesVeiculos = await Promise.all(
          clienteVeiculos.map(async (cv: any) => {
            try {
              const clienteResponse = await this.clienteVeiculoService.getDetalhesCliente(cv.clienteId);
              const veiculoResponse = await this.clienteVeiculoService.getDetalhesVeiculo(cv.veiculoId);

              return {
                clienteVeiculoId: cv.codigoClienteVeiculo,
                nomeCliente: clienteResponse.data.nome,
                marcaVeiculo: veiculoResponse.data.marca,
              };
            } catch (error) {
              this.alertService.mostrarAlerta(`Erro ao buscar detalhes de cliente ou veículo para código ${cv.codigoClienteVeiculo}: ${error}`, false);
              return {
                clienteVeiculoId: cv.codigoClienteVeiculo,
                nomeCliente: 'Nome não disponível',
                marcaVeiculo: 'Marca não disponível',
              };
            }
          })
        );
      } else {
        this.alertService.mostrarAlerta('A resposta do serviço de Clientes e Ceículos é indefinida.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar Clientes e Veículos: ${error}`, false);
    }
  }

  encontrarNomeCliente(clienteVeiculoId: number): string {
    const clienteVeiculo = this.codigosClientesVeiculos.find(
      (cv) => cv.clienteVeiculoId === clienteVeiculoId
    );
    return clienteVeiculo ? clienteVeiculo.nomeCliente : 'Nome não disponível';
  }

  encontrarMarcaVeiculo(clienteVeiculoId: number): string {
    const clienteVeiculo = this.codigosClientesVeiculos.find(
      (cv) => cv.clienteVeiculoId === clienteVeiculoId
    );
    return clienteVeiculo ? clienteVeiculo.marcaVeiculo : 'Marca não disponível';
  }


  async atualizarPermanencia(dadosAtualizados: any) {
    try {
      await this.permanenciaService.updatePermanencia(dadosAtualizados);
      this.alertService.mostrarAlerta('Permanência concluída com sucesso!');

      this.getAllPermanencias();
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao concluir Permanência: ${error}`, false);
    }
  }

  pesquisarPermanencias() {
    if (this.termoDePesquisaPermanencia.trim() !== '') {
      this.permanenciasFiltradas = this.permanencias.filter(permanencia =>
        permanencia.placa.toLowerCase().includes(this.termoDePesquisaPermanencia.toLowerCase())
      );

      this.totalDePaginas = Math.max(1, Math.ceil(this.permanenciasFiltradas.length / this.itensPorPagina));
      this.paginaAtual = 1;
    } else {
      this.permanenciasFiltradas = this.permanencias.slice(0, this.itensPorPagina);
      this.totalDePaginas = Math.max(1, Math.ceil(this.permanencias.length / this.itensPorPagina));
      this.paginaAtual = 1;
    }
  }

  atualizarPermanenciasFiltradas() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = indiceInicial + this.itensPorPagina;
    this.permanenciasFiltradas = this.permanencias.slice(indiceInicial, indiceFinal);
  }

  async excluirPermanencia(codigoPermanencia: number) {
    const confirmacao = confirm('Deseja realmente excluir esta Permanência?');

    if (confirmacao) {
      try {
        await this.permanenciaService.deletePermanencia(codigoPermanencia);
        this.alertService.mostrarAlerta('Permanência excluída com sucesso!');
        this.getAllPermanencias();
      } catch (error) {
        this.alertService.mostrarAlerta(`Erro ao excluir Permanência: ${error}`, false);
      }
    }
  }

  limparCampoPesquisa() {
    this.termoDePesquisaPermanencia = '';
    this.getAllPermanencias();
  }

  gerarPDF(permanencia: Permanencia) {
    const doc = new jsPDF();

    const clienteVeiculoIdString = permanencia.clienteVeiculoId.toString();
    const dataEntradaString = this.formatarDataPdf(permanencia.dataEntrada);
    const dataSaidaString = this.formatarDataPdf(permanencia.dataSaida);
    const taxaPorHoraString = permanencia.taxaPorHora.toString();
    const valorTotalString = permanencia.valorTotal ? permanencia.valorTotal.toString() : '';

    doc.text('Código Cliente Veículo: ' + clienteVeiculoIdString, 10, 10);
    doc.text('Placa do Veículo: ' + permanencia.placa, 10, 20);
    doc.text('Data de Entrada: ' + dataEntradaString, 10, 30);
    doc.text('Data de Saída: ' + dataSaidaString, 10, 40);
    doc.text('Valor por Hora:' + taxaPorHoraString, 10, 50);
    doc.text('Valor Total: ' + valorTotalString, 10, 60);
    doc.text('Estado da Permanência: ' + permanencia.estadoPermanencia, 10, 70);

    doc.output('dataurlnewwindow');
  }

  private formatarDataPdf(data: any): string {
    if (data === null) {
      return '';
    } else if (typeof data === 'string') {
      return data;
    } else if (data instanceof Date) {
      const year = data.getFullYear();
      const month = (data.getMonth() + 1).toString().padStart(2, '0');
      const day = data.getDate().toString().padStart(2, '0');
      const hours = data.getHours().toString().padStart(2, '0');
      const minutes = data.getMinutes().toString().padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
      this.alertService.mostrarAlerta(`O valor de data não é do tipo Date ou string: ${data}`, false);
      return '';
    }
  }
}
