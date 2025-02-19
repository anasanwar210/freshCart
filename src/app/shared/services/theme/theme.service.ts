import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = signal<'light' | 'dark'>('light'); // استخدام Signals

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // التحقق من الـ localStorage أو تفعيل الوضع الداكن بناءً على إعدادات النظام
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const defaultTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');

    this.theme.set(defaultTheme);
    this.updateThemeClass();
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    document.documentElement.classList.toggle(
      'dark',
      this.theme() === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }

  get currentTheme() {
    return this.theme;
  }
}
