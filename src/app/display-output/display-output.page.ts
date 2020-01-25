import { Component, OnInit } from '@angular/core';
import { IQRResource } from '../data/models/qr-resource.interface';
import { QRResourceManagerService } from '../services/qrresource-manager.service';

@Component({
  selector: 'app-display-output',
  templateUrl: './display-output.page.html',
  styleUrls: ['./display-output.page.scss'],
})
export class DisplayOutputPage implements OnInit {

  qrResourceList: IQRResource[]

  constructor(public qrManagerService: QRResourceManagerService) {
    this.qrResourceList = this.qrManagerService.getQRResourceList();
  }

  ngOnInit() { }

}
