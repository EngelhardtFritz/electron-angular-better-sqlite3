import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLocale = 'en';
  private availableLocales = new Array<string>(this.defaultLocale, 'de');

  constructor(private translateService: TranslateService) {}

  public initLanguageService(): void {
    this.translateService.addLangs(this.availableLocales);
    this.translateService.setDefaultLang(this.defaultLocale);
  }

  public setLocale(locale: string): string {
    const currentLocale = this.getCurrentLocale();
    if (locale === undefined) return currentLocale;
    if (currentLocale !== locale) {
      this.translateService.use(locale);
    }
    return locale;
  }

  public getCurrentLocale(): string {
    return this.translateService.currentLang;
  }
}
