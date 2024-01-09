import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoCpf'
})
export class FormatoCpfPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    const valorNumerico = value.replace(/\D/g, '');
    const formatoDoValor = valorNumerico.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    return formatoDoValor;
  }

}
