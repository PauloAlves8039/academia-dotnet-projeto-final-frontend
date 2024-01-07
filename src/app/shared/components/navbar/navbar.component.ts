import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const isAuthenticated = this.authService.ehAutenticado();

    if (isAuthenticated) {
      this.userEmail = this.authService.obterEmailUsuario();
    }
  }

  verificarAutenticacao(): boolean {
    return this.authService.ehAutenticado();
  }

  executarLogout() {
    const confirmacao = window.confirm('Deseja realmente sair do programa?');

    if (confirmacao) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

}
