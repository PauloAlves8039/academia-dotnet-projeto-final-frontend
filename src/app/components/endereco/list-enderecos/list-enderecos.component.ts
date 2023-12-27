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

  constructor(
    private enderecoService: EnderecoService,
    private router: Router) {}

  ngOnInit() {
    this.getAllEnderecos();
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

  abrirCadstroDeEndereco() {
    this.router.navigate(['/create-endereco']);
  }

  editarEndereco(codigoEndereco: number) {
    this.router.navigate([`/update-endereco/${codigoEndereco}`]);
  }

  getAllEnderecos() {
    this.enderecoService.getEnderecos().then((data) => {
      this.enderecos = data;
    });
  }

}
