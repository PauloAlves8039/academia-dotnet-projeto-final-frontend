import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { Endereco } from '../../../models/endereco/Endereco';
import { ConsultarCepService } from '../../../services/consultarCep/consultarCep.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.carregarEnderecoDaRota();
  }

  async carregarEnderecoDaRota() {
    const codigoEndereco = this.obterCodigoEnderecoDaRota();

    if (codigoEndereco) {
      this.enderecoExistente = await this.enderecoService.getEnderecoPorCodigo(codigoEndereco);
    } else {
      console.warn('Código do endereço não fornecido na rota.');
    }
  }

  async atualizarEndereco() {
    try {
      if (this.validarCamposObrigatorios()) {
        await this.atualizarPesquisarCep();
        const resposta = await this.enderecoService.updateEndereco(this.enderecoExistente);
        alert('Endereço atualiza com sucesso: ' + resposta);
        this.limparCamposEndereco();
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    } catch (erro) {
      alert('Erro ao atualizar endereço: ' + erro);
    }
  }

  async atualizarPesquisarCep() {
    try {
      if (this.validarDigitosCep(this.novoCep)) {
        const cepData = await this.consultaCepService.consultarCep(this.novoCep).toPromise();

        this.enderecoExistente.logradouro = cepData.logradouro;
        this.enderecoExistente.bairro = cepData.bairro;
        this.enderecoExistente.cidade = cepData.localidade;
        this.enderecoExistente.estado = cepData.uf;
        this.enderecoExistente.cep = cepData.cep;
      }
    } catch (erro) {
      console.error('Erro ao consultar CEP:', erro);
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
    this.enderecoExistente = new Endereco();
    this.novoCep = '';
  }

  private obterCodigoEnderecoDaRota(): number | null {
    const codigoEndereco = this.route.snapshot.paramMap.get('codigoEndereco');
    return codigoEndereco ? +codigoEndereco : null;
  }

}
