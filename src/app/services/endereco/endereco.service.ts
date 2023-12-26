import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private apiUrl = 'https://localhost:7269/api/Endereco';

  constructor() {}

  async getEnderecos() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os endereços: ', error);
    }
  }

}
