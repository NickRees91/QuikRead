import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewQRResourcePage } from './add-new-qrresource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [AddNewQRResourcePage],
  exports: [
    AddNewQRResourcePage
  ]
})
export class AddNewQRResourcePageModule { }
