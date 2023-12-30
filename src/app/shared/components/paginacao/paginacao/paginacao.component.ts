import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit {
  @Input() paginaAtual: number = 1;
  @Input() totalDePaginas: number = 1;
  @Output() trocarPagina = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  paginas() {
    return Array.from({ length: this.totalDePaginas }, (_, i) => i + 1);
  }

}
