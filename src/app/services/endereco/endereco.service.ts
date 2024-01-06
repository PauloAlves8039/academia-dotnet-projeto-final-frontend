import { Injectable } from '@angular/core';
import axios from 'axios';
import { Endereco } from '../../models/endereco/Endereco';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'https://localhost:7269/api/Endereco';

  constructor(private authService: AuthService) {}

  async getEnderecos() {
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
      console.error('Erro ao buscar todos os endereços: ', error);
      return [];
    }
  }

  async getEnderecoPorCodigo(codigoEndereco: number) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoEndereco}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereço por código: ', error);
      return null;
    }
  }

  async addEndereco(endereco: Endereco) {
    try {
      const token = this.getToken();

      const response = await axios.post(this.apiUrl, endereco, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar endereço: ', error);
      return null;
    }
  }

  async updateEndereco(endereco: Endereco) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${endereco.codigoEndereco}`;
      const response = await axios.put(url, endereco, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço: ', error);
      return null;
    }
  }

  async deleteEndereco(codigoEndereco: number) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoEndereco}`;
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir endereço: ', error);
      return null;
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
