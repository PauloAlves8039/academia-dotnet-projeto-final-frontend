import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultarCepService {
  private apiUrl = 'https://viacep.com.br/ws/';

  constructor() {}

  consultarCep(cep: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}${cep}/json`)).pipe(
      map((response) => response.data)
    );
  }
}
