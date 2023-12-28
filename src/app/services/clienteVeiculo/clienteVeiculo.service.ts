import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClienteVeiculo } from '../../models/clienteVeiculo/ClienteVeiculo';

@Injectable({
  providedIn: 'root',
})
export class ClienteVeiculoService {
  private apiUrl = 'https://localhost:7269/api/ClienteVeiculo';

  constructor() {}

  async getClientesVeiculos() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes e veículos vinculados: ', error);
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

}
