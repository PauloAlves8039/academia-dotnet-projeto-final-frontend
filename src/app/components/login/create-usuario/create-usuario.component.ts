import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RegistrarUsuario } from '../../../models/registrarUsuario/RegistrarUsuario';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css'],
})
export class CreateUsuarioComponent implements OnInit {
  registrarUsuario: RegistrarUsuario = { email: '', password: '', confirmPassword: '' };
  mensagem: string = '';
  formEnviado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService,
  ) {}

  ngOnInit() {}

  registrarNovoUsuario() {
    this.formEnviado = true;

    if (
      this.registrarUsuario.email &&
      this.registrarUsuario.password &&
      this.registrarUsuario.confirmPassword
    ) {
      this.authService.register(this.registrarUsuario)
        .then(() => {
          this.alertService.mostrarAlerta('Cadastro realizado com sucesso!');
          setTimeout(() => {
            this.limparCamposAposCadastro();
          }, 1000);
        })
        .catch(error => {
          this.alertService.mostrarAlerta(`Erro ao cadastrar usuário. Verifique os detalhes e tente novamente: ${error}`, false);
        });
    }
  }

  voltarParaTelaDeLogin() {
    this.router.navigate(['/login']);
  }

  limparCamposAposCadastro() {
    this.registrarUsuario = { email: '', password: '', confirmPassword: '' };
    this.formEnviado = false;
  }

  limparCampos() {
    this.registrarUsuario = { email: '', password: '', confirmPassword: '' };
    this.formEnviado = false;
    window.location.reload();
  }
}
