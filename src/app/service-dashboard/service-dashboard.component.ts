import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarService } from '../car-registration/car.service';
import { JobService } from '../job-form/job.service';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../translation/translation.service';

Chart.register(...registerables); // Register Chart.js plugins for Angular usage
@Component({
  selector: 'app-service-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.scss',
})
export class ServiceDashboardComponent {
  numberOfCars: number = 0;
  numberOfJobs: number = 0;
  numberOfInProgressJobs: number = 0;
  numberOfCompleterdJobs: number = 0;
  numberOfNotStartedJobs: number = 0;
  chart: Chart | undefined;
  doughnutConfig: any;

  constructor(
    private carService: CarService,
    private jobService: JobService,
    private http: HttpClient,
    public translationService: TranslationService
  ) {}

  // Initialize chart and update data
  ngAfterViewInit(): void {
    this.loadDoughnutConfig().subscribe((config) => {
      this.doughnutConfig = config;
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
      this.numberOfCompleterdJobs = jobs.filter(
        (job) => job.status === 'Completed'
      ).length;
      this.numberOfNotStartedJobs = jobs.filter(
        (job) => job.status === 'Not Started'
      ).length;
      this.updateDoughnutChart();
    });
  }

  // Load chart configuration from a JSON file
  loadDoughnutConfig() {
    return this.http.get<any>('/assets/charts/doughnut.json');
  }

  // Update the Doughnut chart with the latest data
  updateDoughnutChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.doughnutConfig) {
      this.doughnutConfig.data.datasets[0].data = [
        this.numberOfCompleterdJobs,
        this.numberOfNotStartedJobs,
        this.numberOfInProgressJobs,
      ];
      this.chart = new Chart('doughnutChart', this.doughnutConfig);
    }
  }

  // Calculate the percentage of a specific job status
  getPercentage(count: number): number {
    return this.numberOfJobs > 0 ? (count / this.numberOfJobs) * 100 : 0;
  }
}
