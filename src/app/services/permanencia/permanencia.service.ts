import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PermanenciaService {
  private apiUrl = 'https://localhost:7269/api/Permanencia';

  constructor() {}

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
        `Erro ao obter permanência com código ${codigoPermanencia}: `,
        error
      );
    }
  }

  async updatePermanencia(permanenciaData: any) {
    try {
      const response = await axios.put(`${this.apiUrl}/${permanenciaData.codigoPermanencia}`, permanenciaData);
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

}
