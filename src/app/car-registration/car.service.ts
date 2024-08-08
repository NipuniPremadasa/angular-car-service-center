import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carUrl = 'assets/cars.json'; // For GET requests

  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.carUrl);
  }

  // This method is meant to interact with a real API
  addCar(carData: any): Observable<any> {
    throw new Error('Method not implemented. Use a real API for POST requests.');
  }
}
