import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobDetails, JobStatus } from '../interfaces/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobUrl = 'assets/jobs.json';
  private jobs: JobDetails[] = [];
  statuses: JobStatus[] = [JobStatus.NotStarted, JobStatus.InProgress, JobStatus.Completed];

  constructor(private http: HttpClient) {}

  // Fetches job data from the JSON file
  getJobs(): Observable<JobDetails[]> {
    return this.http.get<JobDetails[]>(this.jobUrl).pipe(
      map((data) => {
        this.jobs = data;
        return this.jobs;
      })
    );
  }

  // Adds a new job with a default status of 'Not Started'
  addJob(jobData: Omit<JobDetails, 'id' | 'status'>): Observable<JobDetails> {
    const newJob: JobDetails = {
      ...jobData,
      id: this.jobs.length + 1,
      status: 'Not Started' as JobStatus,
    };
    this.jobs.push(newJob);
    return of(newJob);
  }

  // Updates the status of a specific job by its ID
  updateJobStatus(jobId: number, status: JobStatus): Observable<JobDetails | undefined> {
    const job = this.jobs.find((job) => job.id === jobId);
    if (job) {
      job.status = status;
    }
    return of(job);
  }
}
