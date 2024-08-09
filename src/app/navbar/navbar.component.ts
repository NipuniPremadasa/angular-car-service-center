import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLanguageDropdownOpen = false;
  isMobileMenuOpen = false;
  currentRoute: string = '';
  private clickListener: (() => void) | undefined;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit() {
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isLanguageDropdownOpen = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

    // // Method to set the current route
    setCurrentRoute(route: string) {
      this.currentRoute = route;
    }
  
    // Method to check if a route is active
    isActive(route: string): boolean {
      return this.currentRoute === route;
    }
}