import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  dropdownOpen = false; // State to manage the dropdown visibility

  // Method to toggle the dropdown visibility
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Method to close the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent): void {
    // Close the dropdown if it's open and the click is outside the dropdown
    if (this.dropdownOpen && !(event.target as HTMLElement).closest('.dropdown-toggle')) {
      this.dropdownOpen = false;
    }
  }
}
