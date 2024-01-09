import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../models/endereco/Endereco';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { ConsultarCepService } from '../../../services/consultarCep/consultarCep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

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
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {}

  async cadastrarEndereco() {
    try {
      if (this.validarCamposObrigatorios()) {
        await this.enderecoService.addEndereco(this.novoEndereco);

        this.alertService.mostrarAlerta('Endereço cadastrado com sucesso!');
        this.limparCamposEndereco();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao cadastrar Endereço: ${error}`, false);
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
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao consultar CEP: ${error}`, false);
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
      this.alertService.mostrarAlerta(`O campo CEP não pode estar vazio.`, false);
      return false;
    }

    if (cep.length !== 8) {
      this.alertService.mostrarAlerta(`O campo CEP deve ter exatamente 8 dígitos.`, false);
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
