import { Injectable } from '@angular/core';
import { IQRResource } from '../data/models/qr-resource.interface';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';
import * as qrGenerator from 'qrcode-generator';

const STORAGE_KEY = 'STORAGE_KEY';

@Injectable({
  providedIn: 'root'
})
export class QRResourceManagerService {

  private qrResourceList: IQRResource[]

  constructor(private storage: Storage) {
    this.getQRResourceList().then((qrResourceList) => {
      this.qrResourceList = qrResourceList;
      if (this.qrResourceList && this.qrResourceList.length == 0) {
        this.addNewQRResource({
          name: 'Breastfeeding resources > Positioning and attachment video',
          description: 'This video provides guidance on supporting mothers to breastfeed effectively.',
          url: new URL('https://youtu.be/3nbTEG1fOrE'),
          qrImage: null,
          publishedDate: moment().toDate()
        });
        this.addNewQRResource({
          name: 'Responsive Feeding Infosheet',
          description: 'This infosheet helps health professionals to support parents to feed their babies responsively and so develop close and loving relationships with them',
          url: new URL('https://bit.ly/2U4oJGW'),
          qrImage: null,
          publishedDate: moment().toDate()
        });
        this.addNewQRResource({
          name: 'Handle with care ',
          description: 'Gives advice on safe ways of holding a baby and suggests ways parents can soothe and cope with a crying baby',
          url: new URL('https://bit.ly/30XcwoV'),
          qrImage: null,
          publishedDate: moment().toDate()
        });
      }
    });
  }

  public addNewQRResource(newQRResource: IQRResource): Promise<IQRResource[]> {
    if (!this.qrResourceList) {
      this.qrResourceList = [];
    }
    this.qrResourceList.push(newQRResource);
    return this.commitToStorage();
  }

  public removeQRResource(index: number) {
    if (this.qrResourceList && index < this.qrResourceList.length) {
      this.qrResourceList.splice(index, 1);
    }
    return this.commitToStorage();
  }

  public getQRResourceList(): Promise<IQRResource[]> {
    return new Promise((resolve) => {
      this.storage.get(STORAGE_KEY).then((values) => {
        this.qrResourceList = [];
        if (values) {
          this.qrResourceList = values.map((value) => {
            const qrResource: IQRResource = {
              name: value.name,
              description: value.description,
              url: new URL(value.url),
              qrImage: null,
              publishedDate: moment(value.publishedDate).toDate()
            };
            return qrResource;
          });
          if (this.qrResourceList) {
            for (let index = 0; index < this.qrResourceList.length; index++) {
              let qrResource = this.qrResourceList[index];
              qrResource.qrImage = this.generateQRCodeDataURLFromString(`${qrResource.url}`);
            }
          }
        }
        resolve(this.qrResourceList);
      });
    });
  }

  public commitToStorage(): Promise<IQRResource[]> {
    return new Promise((resolve) => {
      const convertedList = this.qrResourceList.map((qrResource) => {
        const temp: any = qrResource;
        if (qrResource.qrImage) { temp.qrImage = qrResource.qrImage.toString() }
        if (qrResource.url) { temp.url = qrResource.url.toString() }
        return temp;
      });
      this.storage.set(STORAGE_KEY, convertedList).then(() => {
        resolve(this.qrResourceList);
      });
    });
  }

  // QR Code Generation
  public generateQRCodeDataURLFromString(data: string): URL {
    const qr = qrGenerator(4, 'L');
    qr.addData(data);
    qr.make();
    return new URL(qr.createDataURL(10, 20));
  }

}
