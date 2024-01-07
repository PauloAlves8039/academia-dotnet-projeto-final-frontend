import { Component, OnInit } from '@angular/core';
import { PermanenciaService } from '../../../services/permanencia/permanencia.service';
import { ClienteVeiculoService } from '../../../services/clienteVeiculo/clienteVeiculo.service';
import { Permanencia } from '../../../models/permanencia/Permanencia';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-create-permanencia',
  templateUrl: './create-permanencia.component.html',
  styleUrls: ['./create-permanencia.component.css'],
})
export class CreatePermanenciaComponent implements OnInit {
  permanencia: Permanencia = new Permanencia();
  permanenciaData: any = {};
  codigosClientesVeiculos: any[] = [];
  opcoesTaxaPorHora: number[] = [3.00];

  constructor(
    private permanenciaService: PermanenciaService,
    private clienteVeiculoService: ClienteVeiculoService,
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.carregarCodigosClienteVeiculo();
  }

  voltarParaListaPermanencias() {
    this.router.navigate(['/permanencias']);
  }

  async carregarCodigosClienteVeiculo() {
    try {
      const clienteVeiculos = await this.clienteVeiculoService.getClientesVeiculos();

      if (clienteVeiculos) {
        this.codigosClientesVeiculos = await Promise.all(
          clienteVeiculos.map(async (cv: any) => {
            try {
              const clienteResponse = await this.clienteVeiculoService.getDetalhesCliente(cv.clienteId);
              const veiculoResponse = await this.clienteVeiculoService.getDetalhesVeiculo(cv.veiculoId);

              return {
                clienteVeiculoId: cv.codigoClienteVeiculo,
                nomeCliente: clienteResponse.data.nome,
                marcaVeiculo: veiculoResponse.data.marca,
              };
            } catch (error) {
              this.alertService.mostrarAlerta(`Erro ao buscar detalhes de cliente ou veículo para código ${cv.codigoClienteVeiculo}: ${error}`, false);
              return {
                clienteVeiculoId: cv.codigoClienteVeiculo,
                nomeCliente: 'Nome não disponível',
                marcaVeiculo: 'Marca não disponível',
              };
            }
          })
        );
      } else {
        this.alertService.mostrarAlerta('A resposta do serviço de Clientes e Ceículos é indefinida.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao carregar e Cliente e Veículo: ${error}`, false);
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
            this.alertService.mostrarAlerta('Permanência cadastrada com sucesso!');
            this.limparCamposPermanencia();
          })
          .catch((error) => {
            this.alertService.mostrarAlerta(`Erro ao cadastrar Permanência: ${error}`, false);
          });
      } else {
        this.alertService.mostrarAlerta(`Por favor, preencha todos os campos obrigatórios.`, false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao cadastrar Permanência: ${error}`, false);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.permanenciaData.clienteVeiculoId &&
      !!this.permanenciaData.placa &&
      !!this.permanenciaData.dataEntrada &&
      !!this.permanenciaData.taxaPorHora
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
      this.alertService.mostrarAlerta(`O valor de data não é do tipo Date ou string: ${data}`, false);
      return '';
    }
  }
}
