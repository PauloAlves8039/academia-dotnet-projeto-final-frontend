import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Router } from '@angular/router';
import { EnderecoService } from '../../../services/endereco/endereco.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  termoDePesquisaCliente: string = '';
  itensPorPagina: number = 5;
  paginaAtual: number = 1;
  totalDePaginas: number = 1;

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private router: Router) { }

  ngOnInit() {
    this.getAllClientes();
  }

  abrirCadastroDeCliente() {
    this.router.navigate(['/create-cliente']);
  }

  editarCliente(codigoCliente: number) {
    this.router.navigate([`/update-cliente/${codigoCliente}`]);
  }

  trocarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarClientesFiltrados();
  }

  // async getAllClientes(): Promise<any[]> {
  //   try {
  //     const clientes = await this.clienteService.getClientes();

  //     const clientesComEndereco = await Promise.all(
  //       clientes.map(async (cliente: any) => {
  //         const endereco = await this.enderecoService.getEnderecoPorCodigo(cliente.codigoEndereco);
  //         return { ...cliente, endereco };
  //       })
  //     );

  //     this.clientes = clientesComEndereco;

  //     this.clientesFiltrados = clientes;
  //     this.pesquisarClientes();

  //     return clientesComEndereco;
  //   } catch (error) {
  //     console.error('Erro ao buscar todos os clientes: ', error);
  //     return [];
  //   }
  // }

  async getAllClientes(): Promise<any[]> {
    try {
      const clientes = await this.clienteService.getClientes();

      // Certifique-se de que 'clientes' é um array antes de continuar
      if (!Array.isArray(clientes)) {
        console.error('Dados de clientes não são um array válido:', clientes);
        return [];
      }

      const clientesComEndereco = await Promise.all(
        clientes.map(async (cliente: any) => {
          const endereco = await this.enderecoService.getEnderecoPorCodigo(cliente.codigoEndereco);
          return { ...cliente, endereco };
        })
      );

      this.clientes = clientesComEndereco;

      this.clientesFiltrados = clientes;
      this.pesquisarClientes();

      return clientesComEndereco;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes: ', error);
      return [];
    }
  }


  pesquisarClientes() {
    if (this.termoDePesquisaCliente.trim() !== '') {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.termoDePesquisaCliente.toLowerCase()) ||
        cliente.cpf.includes(this.termoDePesquisaCliente)
      );

      this.totalDePaginas = Math.max(1, Math.ceil(this.clientesFiltrados.length / this.itensPorPagina));
      this.paginaAtual = 1;
    } else {
      this.clientesFiltrados = this.clientes.slice(0, this.itensPorPagina);
      this.totalDePaginas = Math.max(1, Math.ceil(this.clientes.length / this.itensPorPagina));
      this.paginaAtual = 1;
    }
  }

  atualizarClientesFiltrados() {
    const indiceInicial = (this.paginaAtual - 1) * this.itensPorPagina;
    const indiceFinal = indiceInicial + this.itensPorPagina;
    this.clientesFiltrados = this.clientes.slice(indiceInicial, indiceFinal);
  }

  async excluirCliente(codigoCliente: number) {
    const confirmacao = confirm('Deseja realmente excluir este cliente?');

    if (confirmacao) {
      try {
        const resposta = await this.clienteService.deleteCliente(codigoCliente);
        alert('Cliente excluído com sucesso:'+ resposta);
        this.getAllClientes();
      } catch (erro) {
        console.error('Erro ao excluir endereço:', erro);
      }
    }
  }

  limparCampoPesquisa() {
    this.termoDePesquisaCliente = '';
    this.getAllClientes();
  }

  formatarData(data: string): string {
    if (!data) return '';

    const dataNascimento = new Date(data);

    const dia = dataNascimento.getDate().toString().padStart(2, '0');
    const mes = (dataNascimento.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataNascimento.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

}
