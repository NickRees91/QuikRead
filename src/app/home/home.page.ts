import { Component } from '@angular/core';
import { QRResourceManagerService } from '../services/qrresource-manager.service';
import { IQRResource } from '../data/models/qr-resource.interface';
import { ModalController } from '@ionic/angular';
import { AddNewQRResourcePage } from '../add-new-qrresource/add-new-qrresource.page';
import { DisplayOutputPage } from '../display-output/display-output.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qrResourceList: IQRResource[]

  constructor(public modalController: ModalController,
    public qrManagerService: QRResourceManagerService) {
  }

  public removeQRResource(index: number) {
    this.qrManagerService.removeQRResource(index).then((qrResourceList) => {
      this.qrResourceList = qrResourceList;
    });
  }

  async displayAddNewQRResourceModal() {
    const modal = await this.modalController.create({
      component: AddNewQRResourcePage
    });
    return await modal.present();
  }

  async displayOutputPageModal() {
    const modal = await this.modalController.create({
      component: DisplayOutputPage
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    this.qrManagerService.getQRResourceList().then(qrResourceList => {
      this.qrResourceList = qrResourceList;
    });
  }
}
