export class Veiculo {
  codigoVeiculo: number;
  tipo: string;
  marca: string;
  modelo: string;
  cor: string;
  ano: number;
  observacoes: string | null;

  constructor() {
    this.codigoVeiculo = 0;
    this.tipo = '';
    this.marca = '';
    this.modelo = '';
    this.cor = '';
    this.ano = 0;
    this.observacoes = '';
  }
}
