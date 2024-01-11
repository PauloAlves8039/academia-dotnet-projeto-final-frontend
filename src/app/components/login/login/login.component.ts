import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/usuario/Usuario';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario('', '');
  formEnviado: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  executarLogin() {
    this.formEnviado = true;

    if (this.usuario.email && this.usuario.password) {
      this.authService.login(this.usuario)
        .then(() => {
          this.alertService.mostrarAlerta(`Bem-vindo! Login bem-sucedido.`);

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);

          setTimeout(() => {
            window.location.reload();
          }, 3100);
        })
        .catch(error => {
          this.alertService.mostrarAlerta(`Erro ao logar! Verifique as suas credencias - ${error}`, false);
        });
    }
  }

  limparCampos() {
    this.usuario = new Usuario('', '');
    this.formEnviado = false;
    window.location.reload();
  }
}
