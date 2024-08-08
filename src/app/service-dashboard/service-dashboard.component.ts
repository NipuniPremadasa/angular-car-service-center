import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarService } from '../car-registration/car.service';
import { JobService } from '../job-form/job.service';

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

  constructor(private carService: CarService, private jobService: JobService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars) => {
      this.numberOfCars = cars.length;
    });

    this.jobService.getJobs().subscribe((jobs) => {
      this.numberOfJobs = jobs.length;
      this.numberOfInProgressJobs = jobs.filter(
        (job) => job.status === 'In Progress'
      ).length;
    });
  }
}
