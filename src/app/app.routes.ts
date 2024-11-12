import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const routes: Routes = [
  { path: '', component: MainViewComponent }
];

@NgModule({
  imports: [
    DragDropModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
