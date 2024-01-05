import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '../../../models/veiculo/Veiculo';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-update-veiculo',
  templateUrl: './update-veiculo.component.html',
  styleUrls: ['./update-veiculo.component.css'],
})
export class UpdateVeiculoComponent implements OnInit {
  veiculoExistente: Veiculo = new Veiculo();

  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.carregarVeiculoPelaRota();
  }

  voltarParaListaDeVeiculos() {
    this.router.navigate(['/veiculos']);
  }

  async carregarVeiculoPelaRota() {
    const codigoVeiculo = this.obterCodigoVeiculoPelaRota();

    if (codigoVeiculo) {
      this.veiculoExistente = await this.veiculoService.getVeiculoPorCodigo(codigoVeiculo);
    } else {
      console.warn('Código do veículo não fornecido na rota.');
    }
  }

  async atualizarVeiculo() {
    try {
      if (this.validarCamposObrigatorios()) {
        await this.veiculoService.updateVeiculo(this.veiculoExistente);

        this.alertService.mostrarAlerta('Veículo atualizado com sucesso!');
        this.limparCamposVeiculo();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao atualizar Veículo: ${error}`, false);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.veiculoExistente.tipo &&
      !!this.veiculoExistente.marca &&
      !!this.veiculoExistente.modelo &&
      !!this.veiculoExistente.cor &&
      !!this.veiculoExistente.ano
    );
  }

  limparCamposVeiculo() {
    this.veiculoExistente = new Veiculo();
  }

  private obterCodigoVeiculoPelaRota(): number | null {
    const codigoVeiculo = this.route.snapshot.paramMap.get('codigoVeiculo');
    return codigoVeiculo ? +codigoVeiculo : null;
  }
}
