import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobUrl = 'assets/jobs.json';
  private jobs: any[] = [];

  constructor(private http: HttpClient) {}

  // Fetches job data from the JSON file
  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.jobUrl).pipe(
      map((data) => {
        this.jobs = data;
        return this.jobs;
      })
    );
  }

  // Adds a new job with a default status of 'Not Started'
  addJob(jobData: any): Observable<any> {
    const newJob = {
      ...jobData,
      id: this.jobs.length + 1,
      status: 'Not Started',
    };
    this.jobs.push(newJob);
    return of(newJob);
  }

  // Updates the status of a specific job by its ID
  updateJobStatus(jobId: number, status: string): Observable<any> {
    const job = this.jobs.find((job) => job.id === jobId);
    if (job) {
      job.status = status;
    }
    return of(job);
  }
}
