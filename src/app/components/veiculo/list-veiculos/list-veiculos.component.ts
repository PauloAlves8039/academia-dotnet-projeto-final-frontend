import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-veiculos',
  templateUrl: './list-veiculos.component.html',
  styleUrls: ['./list-veiculos.component.css'],
})
export class ListVeiculosComponent implements OnInit {
  veiculos: any[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router) {}

  ngOnInit() {
    this.getAllVeiculos();
  }

  // async excluirEndereco(codigoEndereco: number) {
  //   const confirmacao = confirm('Deseja realmente excluir este endereço?');

  //   if (confirmacao) {
  //     try {
  //       const resposta = await this.enderecoService.deleteEndereco(codigoEndereco);
  //       alert('Endereço excluído com sucesso:'+ resposta);
  //       this.getAllEnderecos();
  //     } catch (erro) {
  //       console.error('Erro ao excluir endereço:', erro);
  //     }
  //   }
  // }

  async excluirVeiculo(codigoVeiculo: number) {
    const confirmacao = confirm('Deseja realmente excluir este veículo?');

    if (confirmacao) {
      try {
        const resposta = await this.veiculoService.deleteVeiculo(codigoVeiculo);
        alert('Veículo excluído com sucesso:'+ resposta);
        this.getAllVeiculos();
      } catch (erro) {
        console.error('Erro ao excluir veículo:', erro);
      }
    }
  }

  abrirCadastroDoVeiculo() {
    this.router.navigate(['/create-veiculo']);
  }

  editarVeiculo(codigoVeiculo: number) {
    this.router.navigate([`/update-veiculo/${codigoVeiculo}`]);
  }

  getAllVeiculos() {
    this.veiculoService.getVeiculos().then((data) => {
      this.veiculos = data;
    });
  }
}
