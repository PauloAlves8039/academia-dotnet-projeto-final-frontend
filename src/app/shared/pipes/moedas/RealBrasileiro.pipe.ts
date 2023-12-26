import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RealBrasileiro'
})
export class RealBrasileiroPipe implements PipeTransform {

  transform(value: number): string {
    return `R$ ${value.toFixed(2)}`;
  }

}
