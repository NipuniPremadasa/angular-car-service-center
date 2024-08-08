import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, NavbarComponent],
  templateUrl: './car-registration.component.html',
  styleUrl: './car-registration.component.scss'
})
export class CarRegistrationComponent implements OnInit{
  registerForm: FormGroup = new FormGroup({});

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.registerForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     repeatPassword: ['', [Validators.required]],
  //     terms: [false, [Validators.requiredTrue]]
  //   });
  // }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     // Handle form submission logic here
  //   }
  // }

  makes: string[] = ['Toyota', 'Honda', 'Ford', 'BMW'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      vin: ['', Validators.required],
      owner: this.fb.group({
        name: ['', Validators.required],
        contactNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{1,15}$/)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle form submission logic here
    }
  }
}
