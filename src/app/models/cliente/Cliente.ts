export class Cliente {
  codigoCliente: number;
  nome: string;
  dataNascimento: Date | null;
  cpf: string;
  telefone: string;
  email: string;
  codigoEndereco: number;

  constructor() {
    this.codigoCliente = 0;
    this.nome = '';
    this.dataNascimento = new Date();
    this.cpf = '';
    this.telefone = '';
    this.email = '';
    this.codigoEndereco = 0;
  }
}
