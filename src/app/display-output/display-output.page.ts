import { Component, OnInit } from '@angular/core';
import { IQRResource } from '../data/models/qr-resource.interface';
import { QRResourceManagerService } from '../services/qrresource-manager.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-display-output',
  templateUrl: './display-output.page.html',
  styleUrls: ['./display-output.page.scss'],
})
export class DisplayOutputPage implements OnInit {

  qrResourceList: IQRResource[]

  constructor(public qrManagerService: QRResourceManagerService, public modalController: ModalController, ) {
    this.qrManagerService.getQRResourceList().then(qrResourceList => {
      this.qrResourceList = qrResourceList;
    });
  }

  ngOnInit() { }

  dismissTapped() {
    this.modalController.dismiss();
  }

}
