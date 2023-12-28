import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Cliente } from '../../../models/cliente/Cliente';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { Endereco } from '../../../models/endereco/Endereco';

@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.css']
})
export class UpdateClienteComponent implements OnInit {
  clienteExistente: Cliente = new Cliente();
  enderecos: Endereco[] = [];

  constructor(
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.carregarClienteDaRota();
    this.carregarEnderecos();
  }

  voltarParaListaClientes() {
    this.router.navigate(['/clientes']);
  }

  async carregarClienteDaRota() {
    const codigoCliente = this.obterCodigoClienteDaRota();

    if (codigoCliente) {
      this.clienteExistente = await this.clienteService.getClientePorCodigo(codigoCliente);

      if (typeof this.clienteExistente.dataNascimento === 'string') {
        this.clienteExistente.dataNascimento = new Date(this.clienteExistente.dataNascimento);
      }

    } else {
      alert('Código do cliente não fornecido na rota.');
    }
  }

  async atualizarCliente() {
    try {
      if (this.validarCamposObrigatorios()) {
        this.clienteExistente.dataNascimento = new Date(
          this.formatarData(this.clienteExistente.dataNascimento)
        );

        const resposta = await this.clienteService.updateCliente(this.clienteExistente);

        alert('Cliente atualizado com sucesso: ' + resposta);
        this.limparCamposCliente();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao atualizar cliente: ' + erro);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.clienteExistente.nome &&
      !!this.clienteExistente.dataNascimento &&
      !!this.clienteExistente.cpf &&
      !!this.clienteExistente.telefone &&
      !!this.clienteExistente.email &&
      !!this.clienteExistente.codigoEndereco
    );
  }

  limparCamposCliente() {
    this.clienteExistente = new Cliente();
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

  private obterCodigoClienteDaRota(): number | null {
    const codigoEndereco = this.route.snapshot.paramMap.get('codigoEndereco');
    return codigoEndereco ? +codigoEndereco : null;
  }

}
