import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/usuario/Usuario';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  executarLogin() {
    this.formEnviado = true;

    if (this.usuario.email && this.usuario.password) {
      this.authService.login(this.usuario)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Erro no login:', error);
        });
    }
  }
}
