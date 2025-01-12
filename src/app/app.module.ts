// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    RouterOutlet
  ],
  providers: [],
})

export class AppModule {}

bootstrapApplication(AppComponent);
