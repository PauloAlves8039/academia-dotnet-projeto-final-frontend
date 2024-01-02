import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClienteVeiculo } from '../../models/clienteVeiculo/ClienteVeiculo';

@Injectable({
  providedIn: 'root',
})
export class ClienteVeiculoService {
  private apiUrl = 'https://localhost:7269/api/ClienteVeiculo';
  private apiUrlCliente = 'https://localhost:7269/api/Cliente';
  private apiUrlVeiculo = 'https://localhost:7269/api/Veiculo';

  constructor() {}

  async getClientesVeiculos(): Promise<ClienteVeiculo[]> {
    try {
      const response = await axios.get(this.apiUrl);
      const clientesVeiculos = response.data;

      const detalhesClientesVeiculos = await Promise.all(
        clientesVeiculos.map(async (cv: ClienteVeiculo) => {
          try {
            const clienteResponse = await this.getDetalhesCliente(cv.clienteId);
            const veiculoResponse = await this.getDetalhesVeiculo(cv.veiculoId);

            return {
              codigoClienteVeiculo: cv.codigoClienteVeiculo,
              clienteId: cv.clienteId,
              veiculoId: cv.veiculoId,
              nomeCliente: clienteResponse.data.nome,
              marcaVeiculo: veiculoResponse.data.marca,
            };
          } catch (innerError) {
            console.error(
              `Erro ao buscar detalhes de cliente ou veículo para código ${cv.codigoClienteVeiculo}: `,
              innerError
            );
            return {
              codigoClienteVeiculo: cv.codigoClienteVeiculo,
              clienteId: cv.clienteId,
              veiculoId: cv.veiculoId,
              nomeCliente: 'Nome não disponível',
              marcaVeiculo: 'Marca não disponível',
            };
          }
        })
      );

      return detalhesClientesVeiculos;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes e veículos vinculados: ', error);
      throw error;
    }
  }

  async getClienteVeiculoPorCodigo(CodigoClienteVeiculo: number) {
    try {
      const url = `${this.apiUrl}/${CodigoClienteVeiculo}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente e veículo por código: ', error);
    }
  }

  async addClienteVeiculo(clienteVeiculo: ClienteVeiculo) {
    try {
      const response = await axios.post(this.apiUrl, clienteVeiculo);
      return response.data;
    } catch (error) {
      console.error('Erro ao associar cadastro de cliente e veículo: ', error);
    }
  }

  async updateClienteVeiculo(clienteVeiculo: ClienteVeiculo) {
    try {
      const url = `${this.apiUrl}/${clienteVeiculo.codigoClienteVeiculo}`;
      const response = await axios.put(url, clienteVeiculo);
      return response.data;
    } catch (error) {
      console.error('Erro ao associar atualização cliente do cliente: ', error);
    }
  }

  async deleteClienteVeiculo(codigoClienteVeiculo: number) {
    try {
      const url = `${this.apiUrl}/${codigoClienteVeiculo}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir associação entre cliente e veículo: ', error);
    }
  }

  async getDetalhesCliente(clienteId: number) {
    const urlCliente = `${this.apiUrlCliente}/${clienteId}`;
    return axios.get(urlCliente);
  }

  async getDetalhesVeiculo(veiculoId: number) {
    const urlVeiculo = `${this.apiUrlVeiculo}/${veiculoId}`;
    return axios.get(urlVeiculo);
  }

}
