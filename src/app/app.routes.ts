import { Routes } from '@angular/router';
import { CarRegistrationComponent } from './car-registration/car-registration.component';
import { ServiceDashboardComponent } from './service-dashboard/service-dashboard.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    { path: 'car-registration', component: CarRegistrationComponent },
    { path:'service-dashboard', component: ServiceDashboardComponent },
    { path:'job-form', component: JobFormComponent },
    { path:'job-list', component: JobListComponent},
    { path: 'navbar', component: NavbarComponent},
    { path: '', redirectTo: 'service-dashboard', pathMatch: 'full' }
];
