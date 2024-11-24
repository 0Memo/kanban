import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"kanban-ca28d","appId":"1:429632893423:web:d93c861b67726315bc061a","databaseURL":"https://kanban-ca28d-default-rtdb.firebaseio.com","storageBucket":"kanban-ca28d.firebasestorage.app","apiKey":"AIzaSyASU-41wRb8Hfn7FxTErQtv_bjYD6C7zgc","authDomain":"kanban-ca28d.firebaseapp.com","messagingSenderId":"429632893423","measurementId":"G-R0360YZ2R8"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
