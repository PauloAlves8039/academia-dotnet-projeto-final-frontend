import { Injectable } from '@angular/core';
import axios from 'axios';
import { Veiculo } from '../../models/veiculo/Veiculo';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = 'https://localhost:7269/api/Veiculo';

  constructor(private authService: AuthService) {}

  async getVeiculos() {
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
      console.error('Erro ao buscar todos os veículos: ', error);
      return [];
    }
  }

  async getVeiculoPorCodigo(codigoVeiculo: number) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoVeiculo}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar veículo por código: ', error);
      return null;
    }
  }

  async addVeiculo(veiculo: Veiculo) {
    try {
      const token = this.getToken();

      const response = await axios.post(this.apiUrl, veiculo, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar veículo: ', error);
      return null;
    }
  }

  async updateVeiculo(veiculo: Veiculo) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${veiculo.codigoVeiculo}`;
      const response = await axios.put(url, veiculo, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar veículo: ', error);
      return null;
    }
  }

  async deleteVeiculo(codigoVeiculo: number) {
    try {
      const token = this.getToken();

      const url = `${this.apiUrl}/${codigoVeiculo}`;
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao excluir veículo: ', error);
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
