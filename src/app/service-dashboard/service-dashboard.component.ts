import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarService } from '../car-registration/car.service';
import { JobService } from '../job-form/job.service';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables); // Register Chart.js plugins for Angular usage. This must be done in the main AppModule.ts file.

@Component({
  selector: 'app-service-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.scss'
})
export class ServiceDashboardComponent {
  numberOfCars: number = 0;
  numberOfJobs: number = 0;
  numberOfInProgressJobs: number = 0;
  chart: any;
  config: any;

  // public config: any = {
  //   type: 'doughnut',
  //   data: {
  //     labels: [
  //       'Red',
  //       'Blue',
  //       'Yellow'
  //     ],
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [this.numberOfCars, this.numberOfJobs, this.numberOfInProgressJobs],
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)'
  //       ],
  //       hoverOffset: 4
  //     }]
  //   }};

  constructor(private carService: CarService, private jobService: JobService, private http: HttpClient) {}

 
  ngAfterViewInit(): void {
    this.loadDoughnutConfig().subscribe((config) => {
      this.config = config;
      this.updateDoughnutChart();
    });

    this.carService.getCars().subscribe((cars) => {
      this.numberOfCars = cars.length;
      this.updateDoughnutChart();
    });

    this.jobService.getJobs().subscribe((jobs) => {
      this.numberOfJobs = jobs.length;
      this.numberOfInProgressJobs = jobs.filter(
        (job) => job.status === 'In Progress'
      ).length;
      this.updateDoughnutChart();
    });
  }

  loadDoughnutConfig() {
    return this.http.get<any>('/assets/charts/doughnut.json');
  }

  updateDoughnutChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.config) {
      this.config.data.datasets[0].data = [this.numberOfCars, this.numberOfJobs, this.numberOfInProgressJobs];
      this.chart = new Chart('doughnutChart', this.config);
    }
  }
}
