import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

// Use environment variables directly
const firebaseConfig = {
  projectId: process.env['firebaseProjectId'],
  appId: process.env['firebaseAppId'],
  databaseURL: process.env['firebaseDatabaseURL'],
  storageBucket: process.env['firebaseStorageBucket'],
  apiKey: process.env['firebaseApiKey'],
  authDomain: process.env['firebaseAuthDomain'],
  messagingSenderId: process.env['firebaseMessagingSenderId'],
  measurementId: process.env['firebaseMeasurementId']
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ]
};
