import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslationService } from '../translation/translation.service';

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.scss'],
})
export class CarRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  makes: string[] = ['Toyota', 'Honda', 'Ford', 'BMW'];

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService
  ) {
    // Initialize the registration form.
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit(): void { }

  // Create the car registration form group.
  private createRegisterForm(): FormGroup {
    const currentYear = new Date().getFullYear();
    return this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(currentYear),
        ],
      ],
      vin: ['', Validators.required],
      owner: this.fb.group({
        name: ['', Validators.required],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern(/^\+?\d{1,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
      }),
    });
  }

   // Handle form submission if valid.
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
