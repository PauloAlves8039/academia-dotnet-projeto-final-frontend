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

}
