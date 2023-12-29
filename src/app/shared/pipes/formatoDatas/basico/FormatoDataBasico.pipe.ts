import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatoDataBasico'
})
export class FormatoDataBasicoPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy HH:mm'): any {
    if (value) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(value, format);
    }
    return null;
  }

}
