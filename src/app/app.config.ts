import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": environment.firebaseProjectId,
      "appId": environment.firebaseAppId,
      "databaseURL": environment.firebaseDatabaseURL,
      "storageBucket": environment.firebaseStorageBucket,
      "apiKey": environment.firebaseApiKey,
      "authDomain": environment.firebaseAuthDomain,
      "messagingSenderId": environment.firebaseMessagingSenderId,
      "measurementId": environment.firebaseMeasurementId
    })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())]
};
