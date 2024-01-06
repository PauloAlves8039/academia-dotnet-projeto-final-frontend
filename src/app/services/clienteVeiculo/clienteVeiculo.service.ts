import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClienteVeiculo } from '../../models/clienteVeiculo/ClienteVeiculo';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteVeiculoService {
  private apiUrl = 'https://localhost:7269/api/ClienteVeiculo';
  private apiUrlCliente = 'https://localhost:7269/api/Cliente';
  private apiUrlVeiculo = 'https://localhost:7269/api/Veiculo';

  constructor(private authService: AuthService) {}

  async getClientesVeiculos(): Promise<ClienteVeiculo[]> {
    try {
      const token = this.getToken();

      const response = await axios.get(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

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
          } catch (error) {
            console.error(`Erro ao buscar detalhes de cliente ou veículo para código ${cv.codigoClienteVeiculo}: `, error );
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
      const token = this.getToken();

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente e veículo por código: ', error);
    }
  }

  public async getDetalhesCliente(clienteId: number) {
    const urlCliente = `${this.apiUrlCliente}/${clienteId}`;
    const token = this.getToken();

    return axios.get(urlCliente, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  public async getDetalhesVeiculo(veiculoId: number) {
    const urlVeiculo = `${this.apiUrlVeiculo}/${veiculoId}`;
    const token = this.getToken();

    return axios.get(urlVeiculo, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async addClienteVeiculo(clienteVeiculo: ClienteVeiculo) {
    try {
      const token = this.getToken();

      const response = await axios.post(this.apiUrl, clienteVeiculo, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao associar cadastro de cliente e veículo: ', error);
    }
  }

  async updateClienteVeiculo(clienteVeiculo: ClienteVeiculo) {
    try {
      const url = `${this.apiUrl}/${clienteVeiculo.codigoClienteVeiculo}`;
      const token = this.getToken();

      const response = await axios.put(url, clienteVeiculo, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao associar atualização cliente do cliente: ', error);
    }
  }

  async deleteClienteVeiculo(codigoClienteVeiculo: number) {
    try {
      const url = `${this.apiUrl}/${codigoClienteVeiculo}`;
      const token = this.getToken();

      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao excluir associação entre cliente e veículo: ', error);
    }
  }

  private getToken(): string | null {
    const token = this.authService.getToken();

    if (!token) {
      console.error('Token de autenticação ausente.');
      return null;
    }
    return token;
  }
}
