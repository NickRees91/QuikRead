import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { QRResourceManagerService } from '../services/qrresource-manager.service';

import * as moment from 'moment';

@Component({
  selector: 'app-add-new-qrresource',
  templateUrl: './add-new-qrresource.page.html',
  styleUrls: ['./add-new-qrresource.page.scss'],
})
export class AddNewQRResourcePage implements OnInit {

  public newQRResourceForm: FormGroup;
  public validation_messages: any = {
    name: [{ type: 'required', message: 'Name is required' }],
    description: [],
    url: [{ type: 'required', message: 'Link is required' }, { type: 'pattern', message: 'A valid URL is required' }, { type: 'maxlength', message: 'You can only use links which are shorter than 30 characters, please use a URL Shortener like <a href="https://bitly.com/">https://bitly.com/</a>' }],
    publishedDate: []
  };

  constructor(public modalController: ModalController,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public qrManagerService: QRResourceManagerService) {
    this.newQRResourceForm = this.formBuilder.group({
      name: [''],
      description: [''],
      url: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')])],
      publishedDate: [moment().format('YYYY-MM-DD')]
    });
  }

  ngOnInit() {
  }

  dismissTapped() {
    this.modalController.dismiss();
  }

  addNewQRResource() {
    this.qrManagerService.addNewQRResource({
      name: this.newQRResourceForm.value.name,
      description: this.newQRResourceForm.value.description,
      url: new URL(this.newQRResourceForm.value.url),
      qrImage: this.qrManagerService.generateQRCodeDataURLFromString(`${new URL(this.newQRResourceForm.value.url)}`),
      publishedDate: moment(this.newQRResourceForm.value.publishedDate).toDate()
    }).then(() => {
    });;
    this.modalController.dismiss();
  }

  async presentAlertConfirm() {
    let alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'You\'re changes will not be saved ',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            this.modalController.dismiss();
          }
        }, {
          text: 'Stay Here'
        }
      ]
    });
    await alert.present();
  }

}
