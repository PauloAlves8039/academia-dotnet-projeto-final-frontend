import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private mensagem: string | null = null;
  private sucesso: boolean = true;

  constructor() {}

  obterMensagem(): string | null {
    return this.mensagem;
  }

  obterResultadoSucesso(): boolean {
    return this.sucesso;
  }

  mostrarAlerta(mensagem: string, sucesso: boolean = true, tempo: number = 3000): void {
    this.mensagem = mensagem;
    this.sucesso = sucesso;

    setTimeout(() => {
      this.fecharAlerta();
    }, tempo);
  }

  fecharAlerta(): void {
    this.mensagem = null;
    this.sucesso = true;
  }
}
