import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente/Cliente';
import { Endereco } from '../../../models/endereco/Endereco';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css'],
})
export class CreateClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  enderecos: Endereco[] = [];

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarEnderecos();
  }

  voltarParaListaClientes() {
    this.router.navigate(['/clientes']);
  }

  async cadastrarCliente() {
    try {
      if (this.validarCamposObrigatorios()) {
        this.cliente.dataNascimento = new Date(
          this.formatarData(this.cliente.dataNascimento)
        );

        const resposta = await this.clienteService.addCliente(this.cliente);

        alert('Cliente cadastrado com sucesso: ' + resposta);
        this.limparCamposCliente();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao cadastrar cliente: ' + erro);
    }
  }

  private async carregarEnderecos() {
    try {
      this.enderecos = await this.enderecoService.getEnderecos();
    } catch (erro) {
      console.error('Erro ao carregar endereços: ', erro);
    }
  }

  private formatarData(data: any): string {
    if (typeof data === 'string') {
      return data;
    } else if (data instanceof Date) {
      const year = data.getFullYear();
      const month = (data.getMonth() + 1).toString().padStart(2, '0');
      const day = data.getDate().toString().padStart(2, '0');
      const hours = data.getHours().toString().padStart(2, '0');
      const minutes = data.getMinutes().toString().padStart(2, '0');
      const seconds = data.getSeconds().toString().padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    } else {
      console.error('O valor de data não é do tipo Date ou string:', data);
      return '';
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.cliente.nome &&
      !!this.cliente.dataNascimento &&
      !!this.cliente.cpf &&
      !!this.cliente.telefone &&
      !!this.cliente.email &&
      !!this.cliente.codigoEndereco
    );
  }

  limparCamposCliente() {
    this.cliente = new Cliente();
  }
}
