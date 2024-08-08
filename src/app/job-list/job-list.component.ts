import { Component } from '@angular/core';
import { JobService } from '../job-form/job.service';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobFormComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  jobs: any[] = [];
  showAddJobForm: boolean = false;
  statuses: string[] = ['Not Started', 'In Progress', 'Completed'];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  toggleAddJobForm(): void {
    this.showAddJobForm = !this.showAddJobForm;
  }

  onJobAdded(): void {
    this.toggleAddJobForm();
    this.loadJobs();
  }

  updateStatus(jobId: number, status: string): void {
    this.jobService.updateJobStatus(jobId, status).subscribe(() => {
      this.loadJobs();
    });
  }

  onStatusChange(event: Event, jobId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    this.updateStatus(jobId, status);
  }
}
