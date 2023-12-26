import { Injectable } from '@angular/core';
import axios from 'axios';

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

}
