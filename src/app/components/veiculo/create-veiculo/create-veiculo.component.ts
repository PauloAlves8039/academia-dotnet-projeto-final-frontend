import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-create-veiculo',
  templateUrl: './create-veiculo.component.html',
  styleUrls: ['./create-veiculo.component.css'],
})
export class CreateVeiculoComponent implements OnInit {
  novoVeiculo: Veiculo = new Veiculo();

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    public alertService: AlertService,) {}

  ngOnInit() {}

  async cadastrarVeiculo() {
    try {
      if (this.validarCamposObrigatorios()) {
        await this.veiculoService.addVeiculo(this.novoVeiculo);

        this.alertService.mostrarAlerta('Veículo cadastrado com sucesso!');
        this.limparCamposVeiculo();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao cadastrar Veículo: ${error}`, false);
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
