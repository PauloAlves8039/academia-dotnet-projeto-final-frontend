import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/usuario/Usuario';
import { RegistrarUsuario } from '../../../models/registrarUsuario/RegistrarUsuario';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css'],
})
export class CreateUsuarioComponent implements OnInit {
  registrarUsuario: RegistrarUsuario = { email: '', password: '', confirmPassword: '' };
  mensagem: string = '';
  formEnviado: boolean = false;

  constructor(private authService: AuthService) {}

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
          this.mensagem = 'Cadastro realizado com sucesso!';
        })
        .catch(error => {
          console.error('Erro no registro:', error);
          this.mensagem = 'Erro ao cadastrar usuário. Verifique os detalhes e tente novamente.';
        });
    }
  }
}
