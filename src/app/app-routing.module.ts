// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Define routes here
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./pages/main-view/main-view.module').then(m => m.MainViewModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
