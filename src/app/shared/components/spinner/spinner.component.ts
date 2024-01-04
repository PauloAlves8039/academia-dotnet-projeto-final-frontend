import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  exibirSpinner: boolean = true;

  constructor() {}

  ngOnInit() {
    this.executarSpinner();
  }

  executarSpinner() {
    setTimeout(() => {
      this.exibirSpinner = false;
    }, 500);
  }
}
