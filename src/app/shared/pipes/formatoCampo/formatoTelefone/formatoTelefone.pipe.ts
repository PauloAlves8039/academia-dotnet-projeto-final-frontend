import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTelefone'
})
export class FormatoTelefonePipe implements PipeTransform {

  transform(value: string): string {

    if (!value) {
      return '';
    }

    const valorNumerico = value.replace(/\D/g, '');
    const formatoDoValor = valorNumerico.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');

    return formatoDoValor;
  }

}
