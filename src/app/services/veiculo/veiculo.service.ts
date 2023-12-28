import { Injectable } from '@angular/core';
import axios from 'axios';
import { Veiculo } from '../../models/veiculo/Veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = 'https://localhost:7269/api/Veiculo';

  constructor() {}

  async getVeiculos() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os veículos: ', error);
    }
  }

  async getVeiculoPorCodigo(codigoVeiculo: number) {
    try {
      const url = `${this.apiUrl}/${codigoVeiculo}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar veículo por código: ', error);
    }
  }

  async addVeiculo(veiculo: Veiculo) {
    try {
      const response = await axios.post(this.apiUrl, veiculo);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar veículo: ', error);
    }
  }

  async updateVeiculo(veiculo: Veiculo) {
    try {
      const url = `${this.apiUrl}/${veiculo.codigoVeiculo}`;
      const response = await axios.put(url, veiculo);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar veículo: ', error);
    }
  }

  async deleteVeiculo(codigoVeiculo: number) {
    try {
      const url = `${this.apiUrl}/${codigoVeiculo}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir veículo: ', error);
    }
  }

}
