import { AlertService } from './../../../services/alert/alert.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PermanenciaService } from '../../../services/permanencia/permanencia.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef;
  totalValoresPorMes: number[] = [];

  constructor(
    private permanenciaService: PermanenciaService,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.calculaTotalValoresPorMes();
  }

  ngAfterViewInit() {
    if (typeof Chart !== 'undefined') {
      this.calculaTotalValoresPorMes().then(() => {
        this.atualizarGraficoBarras();
      });
    } else {
      this.alertService.mostrarAlerta(`O Chart.js não está carregado corretamente!`, false);
    }
  }

  calculaTotalValoresPorMes(): Promise<void> {
    return this.permanenciaService.getPermanencias().then((permanencias: any[]) => {
      this.totalValoresPorMes = new Array(12).fill(0);

      permanencias.forEach((permanencia: any) => {
        const dataSaida = new Date(permanencia.dataSaida);
        const mes = dataSaida.getMonth();

        this.totalValoresPorMes[mes] += permanencia.valorTotal || 0;
      });
    });
  }

  atualizarGraficoBarras() {
    const canvas = this.barChart.nativeElement;
    const ctx = canvas.getContext('2d');

    const coresPorMes = [
      'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
    ];

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
          {
            label: 'Faturamento total por mês',
            data: this.totalValoresPorMes,
            backgroundColor: coresPorMes,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
    chart.update();
  }
}
