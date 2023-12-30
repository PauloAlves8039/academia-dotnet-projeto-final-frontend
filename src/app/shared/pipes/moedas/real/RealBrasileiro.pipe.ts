import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RealBrasileiro'
})
export class RealBrasileiroPipe implements PipeTransform {

  transform(value: number): string {
    const formatoDaMoeda = 'pt-BR';
    const estiloDaMoeda = 'BRL';

    if (isNaN(value) || value === null) {
      return '';
    }
    return value.toLocaleString(formatoDaMoeda, { style: 'currency', currency: estiloDaMoeda });
  }

}
