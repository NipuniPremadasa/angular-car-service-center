import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslationService } from '../translation/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLanguageDropdownOpen = false;
  isMobileMenuOpen = false;
  currentRoute: string = '';
  currentLanguage!: string;
  private clickListener: (() => void) | undefined;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    public translationService: TranslationService
  ) {
    // Updates currentRoute on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
    // Updates currentLanguage when the language changes
    this.translationService.language$.subscribe(
      (lang) => (this.currentLanguage = lang)
    );

    // Reload current route
    this.router.navigateByUrl(this.router.url);
  }

  // Initializes click listener to close the language dropdown if clicked outside
  ngOnInit() {
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isLanguageDropdownOpen = false;
        }
      }
    );
  }

  // Cleans up click listener on component destruction
  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  // Toggles the language dropdown visibility
  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  // Toggles the mobile menu visibility
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Sets the current route
  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

  // Checks if the given route is the current route
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  // Changes the language and closes the dropdown
  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
    this.isLanguageDropdownOpen = false; // Close the dropdown after selection
  }
}
