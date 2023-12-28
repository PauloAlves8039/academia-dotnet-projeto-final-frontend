import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-veiculo',
  templateUrl: './create-veiculo.component.html',
  styleUrls: ['./create-veiculo.component.css'],
})
export class CreateVeiculoComponent implements OnInit {
  novoVeiculo: Veiculo = new Veiculo();

  constructor(
    private veiculoService: VeiculoService,
    private router: Router) {}

  ngOnInit() {}

  async cadastrarVeiculo() {
    try {
      if (this.validarCamposObrigatorios()) {
        const resposta = await this.veiculoService.addVeiculo(this.novoVeiculo);

        alert('Veículo cadastrado com sucesso: ' + resposta);
        this.limparCamposVeiculo();
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao cadastrar veículo: ' + erro);
    }
  }

  voltarParaListaDeVeiculos() {
    this.router.navigate(['/veiculos']);
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.novoVeiculo.tipo &&
      !!this.novoVeiculo.marca &&
      !!this.novoVeiculo.modelo &&
      !!this.novoVeiculo.cor &&
      !!this.novoVeiculo.ano
    );
  }

  limparCamposVeiculo() {
    this.novoVeiculo = new Veiculo();
  }

}
