import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../car-registration/car.service';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss'
})
export class JobFormComponent {
  @Output() jobAdded = new EventEmitter<void>();

  jobForm: FormGroup;
  cars: any[] = [];

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
  ) {
    this.jobForm = this.fb.group({
      carId: ['', Validators.required],
      description: ['', Validators.required],
      mechanic: ['', Validators.required],
      estimatedCompletionTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
      this.cars.forEach(car => {
        console.log('Car ID:', car.id);
      });
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      // Handle form submission logic here
    }
  }
}
