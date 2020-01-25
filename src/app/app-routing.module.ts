import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  // { path: 'display-output', loadChildren: () => import('./display-output/display-output.module').then(m => m.DisplayOutputPageModule) },
  // { path: 'add-new-qrresource', loadChildren: () => import('./add-new-qrresource/add-new-qrresource.module').then(m => m.AddNewQRResourcePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
