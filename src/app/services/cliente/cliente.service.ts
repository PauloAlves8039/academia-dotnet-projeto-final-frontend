import { Injectable } from '@angular/core';
import axios from 'axios';
import { Cliente } from '../../models/cliente/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://localhost:7269/api/Cliente';

  constructor() {}

  async getClientes() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes: ', error);
    }
  }

  async getClientePorCodigo(codigoCliente: number) {
    try {
      const url = `${this.apiUrl}/${codigoCliente}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente por código: ', error);
    }
  }

  async addCliente(cliente: Cliente) {
    try {
      const response = await axios.post(this.apiUrl, cliente);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar cliente: ', error);
    }
  }

  async updateCliente(cliente: Cliente) {
    try {
      const url = `${this.apiUrl}/${cliente.codigoCliente}`;
      const response = await axios.put(url, cliente);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente: ', error);
    }
  }

  async deleteCliente(codigoCliente: number) {
    try {
      const url = `${this.apiUrl}/${codigoCliente}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir cliente: ', error);
    }
  }
}
