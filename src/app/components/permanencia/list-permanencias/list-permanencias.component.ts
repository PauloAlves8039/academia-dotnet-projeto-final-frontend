import { Component, OnInit } from '@angular/core';
import { PermanenciaService } from '../../../services/permanencia/permanencia.service';
import { Router } from '@angular/router';
import { Permanencia } from '../../../models/permanencia/Permanencia';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-permanencias',
  templateUrl: './list-permanencias.component.html',
  styleUrls: ['./list-permanencias.component.css'],
})
export class ListPermanenciasComponent implements OnInit {
  permanencia: Permanencia = new Permanencia();
  permanencias!: any[];
  clientesVeiculos!: any[];
  permanenciasFiltradas: any[] = [];
  termoDePesquisaPermanencia: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private permanenciaService: PermanenciaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPermanencias();
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

  async atualizarPermanencia(dadosAtualizados: any) {
    try {
      const resposta = await this.permanenciaService.updatePermanencia(
        dadosAtualizados
      );
      alert('Cliente atualizado com sucesso: ' + resposta);

      this.getAllPermanencias();
    } catch (error) {
      console.error('Erro ao atualizar permanência: ', error);
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
        const resposta = await this.permanenciaService.deletePermanencia(
          codigoPermanencia
        );
        alert('Permanência excluída com sucesso:' + resposta);
        this.getAllPermanencias();
      } catch (erro) {
        console.error('Erro ao excluir permanência:', erro);
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
    const valorTotalString = permanencia.valorTotal
      ? permanencia.valorTotal.toString()
      : '';

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
      console.error('O valor de data não é do tipo Date ou string:', data);
      return '';
    }
  }
}
