import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../job-form/job.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslationService } from '../translation/translation.service';
import { JobDetails, JobStatus } from '../interfaces/job.model';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobFormComponent, NavbarComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  jobs: JobDetails[] = [];
  showAddJobForm: boolean = false;
  statuses: JobStatus[] = [
    JobStatus.NotStarted,
    JobStatus.InProgress,
    JobStatus.Completed,
  ];
  status!: string;

  // Expose the JobStatus enum to the template
  public JobStatus = JobStatus;

  constructor(
    private jobService: JobService,
    public translationService: TranslationService
  ) {}

  // Initializes the component and loads the jobs
  ngOnInit(): void {
    this.loadJobs();
  }

  // Loads jobs from the JobService
  loadJobs(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  // Toggles the visibility of the Add Job Form
  toggleAddJobForm(): void {
    this.showAddJobForm = !this.showAddJobForm;
  }

  // Handles the event when a new job is added
  onJobAdded(): void {
    this.toggleAddJobForm();
    this.loadJobs();
  }

  // Updates the status of a job and reloads the jobs list
  updateStatus(jobId: number, status: string): void {
    // this.jobService.updateJobStatus(jobId, status).subscribe(() => {
    //   this.loadJobs();
    // });
    this.status = status;
  }

  // Handles status changes for a job
  onStatusChange(status: string, jobId: number): void {
    this.updateStatus(jobId, status);
  }

  // Tracks jobs by their ID for efficient rendering
  trackByJobId(index: number, job: JobDetails): number {
    return job.id;
  }
}
