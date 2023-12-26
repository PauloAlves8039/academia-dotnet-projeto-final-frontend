import { Injectable } from '@angular/core';
import axios from 'axios';

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

}
