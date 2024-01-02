import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClienteVeiculoService } from '../clienteVeiculo/clienteVeiculo.service';

@Injectable({
  providedIn: 'root',
})
export class PermanenciaService {
  private apiUrl = 'https://localhost:7269/api/Permanencia';

  constructor(private clienteVeiculoService: ClienteVeiculoService) {}

  async getPermanencias() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos as permanências: ', error);
    }
  }

  async addPermanencia(permanenciaData: any) {
    try {
      const response = await axios.post(this.apiUrl, permanenciaData);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar permanência: ', error);
      throw error;
    }
  }

  async getPermanenciaPorCodigo(codigoPermanencia: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/${codigoPermanencia}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao obter permanência com código ${codigoPermanencia}: `, error
      );
    }
  }

  async updatePermanencia(permanenciaData: any) {
    try {
      const response = await axios.put(
        `${this.apiUrl}/${permanenciaData.codigoPermanencia}`,
        permanenciaData
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar permanência: ', error);
      throw error;
    }
  }

  async deletePermanencia(codigoPermanencia: number) {
    try {
      const url = `${this.apiUrl}/${codigoPermanencia}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir permanência: ', error);
    }
  }

  async getPermanenciasComDetalhes(): Promise<any[]> {
    try {
      const clienteVeiculos =
        await this.clienteVeiculoService.getClientesVeiculos();

      const detalhesPermanencias = await Promise.all(
        clienteVeiculos.map(async (cv: any) => {
          try {
            const permanenciaResponse =
              await this.getDetalhesPermanenciaPorClienteVeiculo(
                cv.codigoClienteVeiculo
              );
            const clienteResponse =
              await this.clienteVeiculoService.getDetalhesCliente(cv.clienteId);
            const veiculoResponse =
              await this.clienteVeiculoService.getDetalhesVeiculo(cv.veiculoId);

            return {
              codigoClienteVeiculo: cv.codigoClienteVeiculo,
              clienteVeiculoId: cv.codigoClienteVeiculo,
              nomeCliente: clienteResponse.data.nome,
              marcaVeiculo: veiculoResponse.data.marca,
              modeloVeiculo: veiculoResponse.data.modelo,
              ...permanenciaResponse.data,
            };
          } catch (error) {
            console.error(
              `Erro ao buscar detalhes de cliente, veículo ou permanência para código ${cv.codigoClienteVeiculo}: `, error
            );
            return {
              codigoClienteVeiculo: cv.codigoClienteVeiculo,
              clienteVeiculoId: cv.codigoClienteVeiculo,
              nomeCliente: 'Nome não disponível',
              marcaVeiculo: 'Marca não disponível',
              modeloVeiculo: 'Modelo não disponível',
            };
          }
        })
      );

      return detalhesPermanencias;
    } catch (error) {
      console.error(
        'Erro ao buscar todas as permanências com detalhes: ', error
      );
      throw error;
    }
  }

  async getDetalhesPermanenciaPorClienteVeiculo(codigoClienteVeiculo: number) {
    try {
      const url = `${this.apiUrl}/ClienteVeiculo/${codigoClienteVeiculo}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao buscar detalhes da permanência por cliente e veículo: ', error
      );
      throw error;
    }
  }
}
