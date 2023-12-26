export class Endereco {
  codigoEndereco: number;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;

  constructor() {
    this.codigoEndereco = 0;
    this.logradouro = '';
    this.numero = '';
    this.complemento = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
    this.cep = '';
  }
}
