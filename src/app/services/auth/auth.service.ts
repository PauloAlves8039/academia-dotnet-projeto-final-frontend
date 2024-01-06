import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';
import { Usuario } from '../../models/usuario/Usuario';
import { RegistrarUsuario } from '../../models/registrarUsuario/RegistrarUsuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7269/api/Login';
  private jwtHelper = new JwtHelperService();

  async register(registroUsuario: RegistrarUsuario): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/registrar`, registroUsuario);
    } catch (error: any) {
      console.error('Erro ao fazer registro:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
      throw error;
    }
  }

  async login(usuario: Usuario): Promise<string> {
    try {
      const resposta = await axios.post(`${this.apiUrl}/login`, {
        email: usuario.email,
        password: usuario.password,
      });

      const token = resposta.data.token;

      if (!token) {
        console.error('Token não encontrado na resposta do servidor: ', resposta);
        throw new Error('Token not found in server response');
      }

      localStorage.setItem('token', token);

      return token;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async fazerRequisicaoProtegida(): Promise<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Token não encontrado.');
    }

    try {
      const response = await axios.get(`${this.apiUrl}/recursoProtegido`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error('Erro na requisição protegida:', error);
      throw error;
    }
  }

  ehAutenticado(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const isExpired = this.jwtHelper.isTokenExpired(token);
        return !isExpired;
      } catch (error) {
        console.error('Erro ao decodificar token: ', error);
        return false;
      }
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
