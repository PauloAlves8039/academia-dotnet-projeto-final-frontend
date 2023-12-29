export class Permanencia {
  codigoPermanencia: number;
  clienteVeiculoId: number;
  placa: string;
  dataEntrada: Date | null;
  dataSaida: Date | null;
  taxaPorHora: number;
  valorTotal: number | null;
  estadoPermanencia: string;


  constructor() {
    this.codigoPermanencia = 0;
    this.clienteVeiculoId = 0;
    this.placa = '';
    this.dataEntrada = new Date;
    this.dataSaida = new Date;
    this.taxaPorHora = 0;
    this.valorTotal = 0;
    this.estadoPermanencia = '';
  }
}
