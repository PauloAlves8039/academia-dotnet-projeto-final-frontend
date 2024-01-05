import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { Endereco } from '../../../models/endereco/Endereco';
import { ConsultarCepService } from '../../../services/consultarCep/consultarCep.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-update-endereco',
  templateUrl: './update-endereco.component.html',
  styleUrls: ['./update-endereco.component.css']
})
export class UpdateEnderecoComponent implements OnInit {
  enderecoExistente: Endereco = new Endereco();
  novoCep: string = '';
  enderecoForm!: FormGroup;

  constructor(
    private enderecoService: EnderecoService,
    private consultaCepService: ConsultarCepService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    ) { }

  ngOnInit() {
    this.carregarEnderecoPelaRota();
  }

  async carregarEnderecoPelaRota() {
    const codigoEndereco = this.obterCodigoEnderecoPelaRota();

    if (codigoEndereco) {
      this.enderecoExistente = await this.enderecoService.getEnderecoPorCodigo(codigoEndereco);
    } else {
      console.warn('Código do endereço não fornecido na rota.');
      this.alertService.mostrarAlerta('Código do endereço não fornecido na rota.', false);
    }
  }

  async atualizarEndereco() {
    try {
      if (this.validarCamposObrigatorios()) {
        await this.atualizarPesquisaCep();
        await this.enderecoService.updateEndereco(this.enderecoExistente);

        this.alertService.mostrarAlerta('Endereço atualizado com sucesso!');
        this.limparCamposEndereco();
      } else {
        this.alertService.mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', false);
      }
    } catch (erro) {
      this.alertService.mostrarAlerta(`Erro ao atualizar Endereço: ${erro}`, false);
    }
  }

  async atualizarPesquisaCep() {
    try {
      if (this.validarDigitosCep(this.novoCep)) {
        const cepData = await this.consultaCepService.consultarCep(this.novoCep).toPromise();

        this.enderecoExistente.logradouro = cepData.logradouro;
        this.enderecoExistente.bairro = cepData.bairro;
        this.enderecoExistente.cidade = cepData.localidade;
        this.enderecoExistente.estado = cepData.uf;
        this.enderecoExistente.cep = cepData.cep;
      }
    } catch (error) {
      this.alertService.mostrarAlerta(`Erro ao consultar CEP: ${error}`, false);
    }
  }

  validarCamposObrigatorios(): boolean {
    return (
      !!this.novoCep &&
      this.validarDigitosCep(this.novoCep) &&
      !!this.enderecoExistente.logradouro &&
      !!this.enderecoExistente.numero &&
      !!this.enderecoExistente.bairro &&
      !!this.enderecoExistente.cidade &&
      !!this.enderecoExistente.estado &&
      !!this.enderecoExistente.cep
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
    this.enderecoExistente = new Endereco();
    this.novoCep = '';
  }

  private obterCodigoEnderecoPelaRota(): number | null {
    const codigoEndereco = this.route.snapshot.paramMap.get('codigoEndereco');
    return codigoEndereco ? +codigoEndereco : null;
  }

}
