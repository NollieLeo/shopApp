import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { HttpService } from "../services/http.service";
import { LocalstorageService } from "../services/localstorage.service";
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-register3',
  templateUrl: './register3.page.html',
  styleUrls: ['./register3.page.scss'],
})
export class Register3Page implements OnInit {
  public myPassword: any = '';
  public cMyPassword: any = '';
  public myCode: any = '';
  public myTelNum: any = '';
  public domain: any = 'http://jd.itying.com/';
  constructor(
    public nav: NavController,
    public http: HttpService,
    public storage: LocalstorageService,
    public alerter: AlertService
  ) { }

  ngOnInit() {
    this.myCode = this.storage.get('myCode');
    this.myTelNum = this.storage.get('telNum');
  }
  goBack() {
    this.nav.back();
  }
  sendPassword() {
    if (this.myPassword !== '' && this.cMyPassword !== '') {
      if (this.myPassword !== this.cMyPassword) {
        this.alerter.presentToast('密码不相同');
      } else {
        this.http.ajaxPost(this.domain + 'api/register', { 'tel': this.myTelNum, 'code': this.myCode, 'password': this.myPassword }).then((data: any) => {
          this.storage.remove('myCode');
          this.alerter.presentToast('注册成功，可以登陆！');
          this.nav.navigateForward('/login');
        }).catch((err) => {
          console.log(err);
        })
      }
    } else {
      this.alerter.presentToast('请输入密码')
    }
  }
}
