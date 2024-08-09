import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>(
    this.getStoredLanguage() || 'en'
  );
  private translations = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLanguage.value);
  }

  // Observable to get the current language
  get language$(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  // Set a new language and update translations
  setLanguage(language: string) {
    this.currentLanguage.next(language);
    this.storeLanguage(language);
    this.loadTranslations(language);
  }

  // Load translations from a JSON file based on the language
  private loadTranslations(language: string) {
    this.http.get(`/assets/i18n/${language}.json`).subscribe((translations) => {
      this.translations.next(translations);
    });
  }

  // Get the translation for a given key
  translate(key: string): string {
    const translations = this.translations.value;
    return translations[key] || key;
  }

  // Retrieve the stored language from localStorage
  private getStoredLanguage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language');
    }
    return null;
  }

  // Store the selected language in localStorage
  private storeLanguage(language: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }
}
