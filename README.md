# Car Service Center Management System

## Project Description
The Car Service Center Management System is a web application built using Angular 18 with standalone components. It is designed to manage car services in a service center, allowing users to register cars, manage job statuses, and view statistics on a dashboard. The application supports two languages: English and Spanish, and uses Tailwind CSS for styling, along with SCSS.

## Key Features
- **Car Registration**: 
  - A validated registration form on the car registration page allows users to add new cars to the service center.
  
- **Job Management**: 
  - Users can add jobs for cars, manage job statuses through an intuitive interface with active buttons and a dropdown menu.
  
- **Dashboard**: 
  - Displays the number of cars in the service center and the number of jobs in progress, along with their status.
  - Shows job status as a percentage using a doughnut chart created with Chart.js.
  
- **Multi-Language Support**: 
  - The application supports English and Spanish, with all text managed via language files.

## Technologies Used
- **Angular 18**: Standalone components
- **Tailwind CSS**: For styling
- **SCSS**: For additional styling
- **Chart.js**: For creating doughnut charts on the dashboard
- **Lint**: To ensure code quality and consistency

## Installation Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/NipuniPremadasa/angular-car-service-center.git
    ```
2. Navigate to the project directory:
    ```bash
    cd angular-car-service-center
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the application:
    ```bash
    ng serve
    ```
5. Open your browser and go to:
    ```
    http://localhost:4200
    ```

## Usage Instructions
- **Car Registration**: Navigate to the "Car Registration" page to add new cars using the provided form.
- **Job Management**: Use the "Job Management" page to add jobs, update job statuses, and view job details.
- **Dashboard**: Visit the "Dashboard" to view statistics on the number of cars and jobs, including a visual representation of job statuses.

## Future Improvements
- Replace the use of the "any" keyword with proper TypeScript interfaces and models.
- Ensure all text is included in the `language.json` files to support multi-language functionality.

## Project Structure
The project consists of three main pages:
1. **Car Registration**: For registering new cars.
2. **Job Management**: For managing job details and statuses.
3. **Dashboard**: For displaying statistics and job progress.

## Contributors
- Nipuni Premadasa


