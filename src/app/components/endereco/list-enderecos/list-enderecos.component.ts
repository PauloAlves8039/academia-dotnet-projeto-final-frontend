import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../../services/endereco/endereco.service';

@Component({
  selector: 'app-list-enderecos',
  templateUrl: './list-enderecos.component.html',
  styleUrls: ['./list-enderecos.component.css'],
})
export class ListEnderecosComponent implements OnInit {
  enderecos!: any[];

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit() {
    this.getAllEnderecos();
  }

  getAllEnderecos() {
    this.enderecoService.getEnderecos().then((data) => {
      this.enderecos = data;
    });
  }

}
