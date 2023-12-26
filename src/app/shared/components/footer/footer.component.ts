import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anoAtual!: number;

  constructor() {
    this.anoAtual = new Date().getFullYear();
   }

  ngOnInit() {
  }

}
