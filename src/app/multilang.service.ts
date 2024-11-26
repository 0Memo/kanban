import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MultilangService {

  translateService = inject(TranslateService);

  languageSignal = signal<string>(window.localStorage.getItem('languageSignal') || 'fr');

  // Define the translations for the column names per language
  private columnTranslations = {
    en: {
      'column1': 'Notion',
      'column2': 'Search',
      'column3': 'To do',
      'column4': 'Done',
    },
    fr: {
      'column1': 'Notion',
      'column2': 'Chercher',
      'column3': 'À faire',
      'column4': 'Fait',
    },
    es: {
      'column1': 'Noción',
      'column2': 'Buscar',
      'column3': 'Hacer',
      'column4': 'Hecho',
    },
    pt: {
      'column1': 'Noção',
      'column2': 'Pesquisar',
      'column3': 'Fazer',
      'column4': 'Feito',
    },
  };

  // Update the language and store it in localStorage
  updateLanguage(language: string): void {
    this.languageSignal.update(() => language);
    this.translateService.use(language).subscribe(() => {
      console.log(`Language updated to: ${language}`);
    });
  }

  // Get the translations for columns based on the selected language
  getTranslationsForColumns(language: keyof typeof this.columnTranslations): { [key: string]: string } {
    return this.columnTranslations[language] || this.columnTranslations['fr'];
  }

  getTranslatedColumnName(columnName: string): string {
    const key = `columns.${columnName}`;
    return this.translateService.instant(key) || columnName;
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem('languageSignal', this.languageSignal());
      this.translateService.use(this.languageSignal());
      console.log('Current language:', this.languageSignal());
    });
  }
}
