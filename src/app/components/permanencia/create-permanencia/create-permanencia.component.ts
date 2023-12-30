import { Component, OnInit } from '@angular/core';
import { PermanenciaService } from '../../../services/permanencia/permanencia.service';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { Permanencia } from '../../../models/permanencia/Permanencia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-permanencia',
  templateUrl: './create-permanencia.component.html',
  styleUrls: ['./create-permanencia.component.css'],
})
export class CreatePermanenciaComponent implements OnInit {
  permanencia: Permanencia = new Permanencia();
  permanenciaData: any = {};
  codigosClientesVeiculos: any[] = [];

  constructor(
    private permanenciaService: PermanenciaService,
    private clienteVeiculoService: ClienteVeiculoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarCodigosClienteVeiculo();
  }

  voltarParaListaPermanencias() {
    this.router.navigate(['/permanencias']);
  }

  async carregarCodigosClienteVeiculo() {
    try {
      const clienteVeiculo =
        await this.clienteVeiculoService.getClientesVeiculos();
      this.codigosClientesVeiculos = clienteVeiculo.map(
        (cv: any) => cv.codigoClienteVeiculo
      );
    } catch (error) {
      console.error('Erro ao carregar códigos de Cliente e Veículo:', error);
    }
  }

  cadastrarPermanencia() {
    try {
      if (this.validarCamposObrigatorios()) {
        this.permanenciaData.dataEntrada = this.formatarData(
          this.permanenciaData.dataEntrada
        );

        this.permanenciaService
          .addPermanencia(this.permanenciaData)
          .then((result) => {
            alert('Permanência cadastrada com sucesso!');
            this.limparCamposPermanencia();
          })
          .catch((error) => {
            console.error('Erro ao cadastrar permanência:', error);
          });
      } else {
        console.error('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao cadastrar de permanência: ' + erro);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.permanenciaData.clienteVeiculoId &&
      !!this.permanenciaData.placa &&
      !!this.permanenciaData.dataEntrada
    );
  }

  limparCamposPermanencia() {
    this.permanenciaData = new Permanencia();
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

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
      console.error('O valor de data não é do tipo Date ou string:', data);
      return '';
    }
  }
}
