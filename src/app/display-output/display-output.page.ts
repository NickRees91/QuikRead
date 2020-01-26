import { Component, OnInit } from '@angular/core';
import { IQRResource } from '../data/models/qr-resource.interface';
import { QRResourceManagerService } from '../services/qrresource-manager.service';
import { ModalController } from '@ionic/angular';
import PDFRenderer from '../services/PDFRenderer';

import * as jsPDF from 'jspdf'

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

  renderPDFTapped() {
    const pdfRenderer = new PDFRenderer();
    for (let index = 0; index < 6; index++) {
      const qrResource = this.qrResourceList[index]
      const temp: any = qrResource;
      temp.qrImage = qrResource.qrImage.toString()
      temp.url = qrResource.url.toString()
      pdfRenderer.addEntry(temp);
    }
    pdfRenderer.render(new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    }), 'test.pdf')
  }

}
