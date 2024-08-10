import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../car-registration/car.service';
import { TranslationService } from '../translation/translation.service';
import { Router } from '@angular/router';
import { CarDetails } from '../interfaces/car.model';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  @Output() jobAdded = new EventEmitter<void>();

  jobForm!: FormGroup;
  cars: CarDetails[] = [];
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    public translationService: TranslationService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCars();
  }

  // Initializes the job form with default values and validation rules.
  private initializeForm(): void {
    this.jobForm = this.fb.group({
      car: [null, Validators.required],
      description: ['', Validators.required],
      mechanic: ['', Validators.required],
    });
  }

  // Loads the list of cars from the car service.
  private loadCars(): void {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  // Handles form submission. If the form is valid, emits an event and navigates to the job list.
  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      // this.jobAdded.emit(); // Emit the job added event
      // this.router.navigate(['/job-list']); // Navigate to the job list page
      this.message = 'Job Added Successfully';
      this.isSuccess = true;
    } else {
      this.message = 'Form Invalid';
      this.isSuccess = false;
    }
  }
}
