import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoCep'
})
export class FormatoCepPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    const valorNumerico = value.replace(/\D/g, '');
    const formatoDoValor = valorNumerico.replace(/^(\d{5})(\d{3})$/, '$1-$2');

    return formatoDoValor;
  }

}
