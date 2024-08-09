export interface Car {
    VIN: string;
    make: string;
    model: string;
  }
  
  export interface Job {
    id: number;
    car: Car; // Use 'car' instead of 'carId' for clarity
    description: string;
    mechanic: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }
  