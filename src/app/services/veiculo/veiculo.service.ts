import { Injectable } from '@angular/core';
import axios from 'axios';

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

}
