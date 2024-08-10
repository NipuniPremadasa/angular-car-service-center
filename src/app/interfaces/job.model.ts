export enum JobStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}
export interface Car {
    VIN: string;
    make: string;
    model: string;
  }
  
  export interface JobDetails {
    id: number;
    carId: Car; 
    description: string;
    mechanic: string;
    status: JobStatus;
  }
  