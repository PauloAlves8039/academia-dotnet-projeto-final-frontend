import { Injectable } from '@angular/core';
import axios from 'axios';
import { Endereco } from '../../models/endereco/Endereco';

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

  async getEnderecoPorCodigo(codigoEndereco: number) {
    try {
      const url = `${this.apiUrl}/${codigoEndereco}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar endereço por código: ', error);
    }
  }

  async addEndereco(endereco: Endereco) {
    try {
      const response = await axios.post(this.apiUrl, endereco);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar endereço: ', error);
    }
  }

  async updateEndereco(endereco: Endereco) {
    try {
      const url = `${this.apiUrl}/${endereco.codigoEndereco}`;
      const response = await axios.put(url, endereco);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar endereço: ', error);
    }
  }

  async deleteEndereco(codigoEndereco: number) {
    try {
      const url = `${this.apiUrl}/${codigoEndereco}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir endereço: ', error);
    }
  }

}
