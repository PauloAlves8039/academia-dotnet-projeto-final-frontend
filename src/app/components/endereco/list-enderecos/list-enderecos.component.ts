import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-enderecos',
  templateUrl: './list-enderecos.component.html',
  styleUrls: ['./list-enderecos.component.css'],
})
export class ListEnderecosComponent implements OnInit {
  enderecos!: any[];
  enderecosFiltrados: any[] = [];
  termoDePesquisaEndereco: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private enderecoService: EnderecoService,
    private router: Router) {}

  ngOnInit() {
    this.getAllEnderecos();
  }

  trocarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarEnderecosFiltrados();
  }

  getAllEnderecos() {
    this.enderecoService.getEnderecos().then((data) => {
      this.enderecos = data;
      this.enderecosFiltrados = data;
      this.pesquisarEnderecos();
    });
  }

  pesquisarEnderecos() {
    if (this.termoDePesquisaEndereco.trim() !== '') {
      this.enderecosFiltrados = this.enderecos.filter(endereco =>
        endereco.logradouro.toLowerCase().includes(this.termoDePesquisaEndereco.toLowerCase()) ||
        endereco.cep.includes(this.termoDePesquisaEndereco)
      );

      this.totalDePaginas = Math.max(1, Math.ceil(this.enderecosFiltrados.length / this.itensPorPagina));
      this.paginaAtual = 1;
    } else {
      this.enderecosFiltrados = this.enderecos.slice(0, this.itensPorPagina);
      this.totalDePaginas = Math.max(1, Math.ceil(this.enderecos.length / this.itensPorPagina));
      this.paginaAtual = 1;
    }
  }

  atualizarEnderecosFiltrados() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = indiceInicial + this.itensPorPagina;
    this.enderecosFiltrados = this.enderecos.slice(indiceInicial, indiceFinal);
  }

  async excluirEndereco(codigoEndereco: number) {
    const confirmacao = confirm('Deseja realmente excluir este endereço?');

    if (confirmacao) {
      try {
        const resposta = await this.enderecoService.deleteEndereco(codigoEndereco);
        alert('Endereço excluído com sucesso:'+ resposta);
        this.getAllEnderecos();
      } catch (erro) {
        console.error('Erro ao excluir endereço:', erro);
      }
    }
  }

  limparCampoPesquisa() {
    this.termoDePesquisaEndereco = '';
    this.getAllEnderecos();
  }

  abrirCadastroDeEndereco() {
    this.router.navigate(['/create-endereco']);
  }

  editarEndereco(codigoEndereco: number) {
    this.router.navigate([`/update-endereco/${codigoEndereco}`]);
  }

}
