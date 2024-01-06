import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

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
