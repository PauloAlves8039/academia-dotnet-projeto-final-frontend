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

  async getAllClientes(): Promise<any[]> {
    try {
      const clientes = await this.clienteService.getClientes();

      const clientesComEndereco = await Promise.all(
        clientes.map(async (cliente: any) => {
          const endereco = await this.enderecoService.getEnderecoPorCodigo(cliente.codigoEndereco);
          return { ...cliente, endereco };
        })
      );

      this.clientes = clientesComEndereco;

      return clientesComEndereco;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes: ', error);
      return [];
    }
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
