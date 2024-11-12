// src/app/main-view/main-view.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainViewComponent
  ],
})
export class MainViewModule {}
