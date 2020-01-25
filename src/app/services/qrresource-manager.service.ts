import { Injectable } from '@angular/core';
import { IQRResource } from '../data/models/qr-resource.interface';

import * as moment from 'moment';
import * as qrGenerator from 'qrcode-generator';

@Injectable({
  providedIn: 'root'
})
export class QRResourceManagerService {

  private qrResourceList: IQRResource[]

  constructor() {
    this.addNewQRResource({
      name: 'PDF 1',
      description: 'Description 1',
      url: new URL('https://www.google.co.uk'),
      qrImage: null,
      publishedDate: moment().toDate()
    });
    this.addNewQRResource({
      name: 'PDF 2',
      description: 'Description 1',
      url: new URL('https://www.google.co.uk'),
      qrImage: null,
      publishedDate: moment().toDate()
    });
    this.addNewQRResource({
      name: 'PDF 3',
      description: 'Description 1',
      url: new URL('https://www.google.co.uk'),
      qrImage: null,
      publishedDate: moment().toDate()
    });
  }

  public addNewQRResource(newQRResource: IQRResource) {
    if (!this.qrResourceList) {
      this.qrResourceList = [];
    }
    this.qrResourceList.push(newQRResource);
  }

  public removeQRResource(index: number) {
    if (index < this.qrResourceList.length) {
      this.qrResourceList.splice(index, 1);
    }
  }

  public getQRResourceList(): IQRResource[] {
    for (let index = 0; index < this.qrResourceList.length; index++) {
      let qrResource = this.qrResourceList[index];
      qrResource.qrImage = this.generateQRCodeDataURLFromString(`${qrResource.url}`);
    }
    return this.qrResourceList;
  }


  // QR Code Generation
  public generateQRCodeDataURLFromString(data: string): URL {
    const qr = qrGenerator(4, 'L');
    qr.addData(data);
    qr.make();
    return new URL(qr.createDataURL(10, 20));
  }

}
