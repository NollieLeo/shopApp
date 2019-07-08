import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular"
import { HttpService } from '../services/http.service';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public telNum: any = '';
  public telShow: boolean = false;
  public domain: any = 'http://jd.itying.com/';
  constructor(
    public nav: NavController,
    public http: HttpService,
    public storage: LocalstorageService,
    public alerter: AlertService
  ) { }
  ionViewWillEnter() {
    console.log('hello ionViewWillEnter')
  }
  ngOnInit() {
  }
  goBack() {
    this.nav.back();
  }
  goToCheck() {
    console.log(this.telNum);
    if (/\d{11}$/.test(this.telNum)) {
      this.http.ajaxPost(this.domain + 'api/sendCode', { 'tel': this.telNum }).then((data: any) => {
        console.log(data);
        if (data.success == true) {
          this.alerter.presentToast(data.message);
          this.storage.set('telNum', this.telNum);
          this.nav.navigateForward('/register2');
        } else {
          this.alerter.presentToast(data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      this.alerter.presentToast('请输入正确电话号码');
    }

  }
} 
