import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetails } from '../interfaces/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carUrl = 'assets/cars.json'; // For GET requests

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarDetails[]> {
    return this.http.get<CarDetails[]>(this.carUrl);
  }
}
