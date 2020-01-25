import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AddNewQRResourcePage } from '../add-new-qrresource/add-new-qrresource.page';
import { DisplayOutputPage } from '../display-output/display-output.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, AddNewQRResourcePage, DisplayOutputPage],
  entryComponents: [ //Components that should be loaded with this module
    AddNewQRResourcePage,
    DisplayOutputPage
  ]
})
export class HomePageModule { }
