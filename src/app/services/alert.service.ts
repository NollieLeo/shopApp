import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router"
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController, public toastController: ToastController, public router: Router) { }

  async presentAlertConfirm(msg, addr1, addr2) {
    const alert = await this.alertController.create({
      header: '提示!',
      message: msg,
      mode:'ios',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate([addr2]);
          }
        }, {
          text: '确认',
          handler: () => {
            this.router.navigate([addr1]);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
