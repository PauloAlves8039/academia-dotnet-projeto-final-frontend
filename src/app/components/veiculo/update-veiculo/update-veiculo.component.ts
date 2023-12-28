import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '../../../models/veiculo/Veiculo';

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
    private router: Router
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
        const resposta = await this.veiculoService.updateVeiculo(this.veiculoExistente);
        alert('Veículo atualizado com sucesso: ' + resposta);
        this.limparCamposVeiculo();
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao atualizar veículo: ' + erro);
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
