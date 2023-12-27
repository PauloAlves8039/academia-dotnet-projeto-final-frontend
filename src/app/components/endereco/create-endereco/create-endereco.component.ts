import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../models/endereco/Endereco';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { ConsultarCepService } from '../../../services/consultarCep/consultarCep.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-endereco',
  templateUrl: './create-endereco.component.html',
  styleUrls: ['./create-endereco.component.css'],
})
export class CreateEnderecoComponent implements OnInit {
  novoEndereco: Endereco = new Endereco();
  cepPesquisado: string = '';
  enderecoForm!: FormGroup;

  constructor(
    private enderecoService: EnderecoService,
    private consultaCepService: ConsultarCepService,
    private router: Router
  ) {}

  ngOnInit() {}

  async cadastrarEndereco() {
    try {
      if (this.validarCamposObrigatorios()) {
        const resposta = await this.enderecoService.addEndereco(this.novoEndereco);

        alert('Endereço cadastrado com sucesso: ' + resposta);
        this.limparCamposEndereco();
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao cadastrar endereço: ' + erro);
    }
  }

  async pesquisarCep() {
    try {
      if (this.validarDigitosCep(this.cepPesquisado)) {
        const cepData = await this.consultaCepService.consultarCep(this.cepPesquisado).toPromise();

        this.novoEndereco.logradouro = cepData.logradouro;
        this.novoEndereco.bairro = cepData.bairro;
        this.novoEndereco.cidade = cepData.localidade;
        this.novoEndereco.estado = cepData.uf;
        this.novoEndereco.cep = cepData.cep;
      }
    } catch (erro) {
      console.error('Erro ao consultar CEP:', erro);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.cepPesquisado &&
      this.validarDigitosCep(this.cepPesquisado) &&
      !!this.novoEndereco.logradouro &&
      !!this.novoEndereco.numero &&
      !!this.novoEndereco.bairro &&
      !!this.novoEndereco.cidade &&
      !!this.novoEndereco.estado &&
      !!this.novoEndereco.cep
    );
  }

  validarDigitosCep(cep: string): boolean {
    if (!cep) {
      alert('O campo CEP não pode estar vazio.');
      return false;
    }

    if (cep.length !== 8) {
      alert('O campo CEP deve ter exatamente 8 dígitos.');
      return false;
    }

    return true;
  }

  voltarParaListaEnderecos() {
    this.router.navigate(['/enderecos']);
  }

  limparCamposEndereco() {
    this.novoEndereco = new Endereco();
    this.cepPesquisado = '';
  }

}
