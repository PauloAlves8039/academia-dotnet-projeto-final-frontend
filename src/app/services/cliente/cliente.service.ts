import { Injectable } from '@angular/core';
import axios from 'axios';
import { Cliente } from '../../models/cliente/Cliente';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://localhost:7269/api/Cliente';

  constructor(private authService: AuthService) {}

  async getClientes() {
    try {
      const token = this.getToken();

      if (!token) {
        return [];
      }

      const response = await axios.get(this.apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os clientes: ', error);
    }
  }

  async getClientePorCodigo(codigoCliente: number): Promise<Cliente | null> {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoCliente}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data as Cliente;
    } catch (error) {
      console.error('Erro ao buscar cliente por código: ', error);
      return null;
    }
  }

  async addCliente(cliente: Cliente): Promise<Cliente | null> {
    try {
      const token = this.getToken();

      const response = await axios.post(this.apiUrl, cliente, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar cliente: ', error);
      return null;
    }
  }

  async updateCliente(cliente: Cliente): Promise<Cliente | null> {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${cliente.codigoCliente}`;
      const response = await axios.put(url, cliente, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente: ', error);
      return null;
    }
  }

  async deleteCliente(codigoCliente: number): Promise<any> {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoCliente}`;
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao excluir cliente: ', error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          throw new Error('Você não tem permissão para excluir Clientes.');
        }
      }

      throw error;
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
