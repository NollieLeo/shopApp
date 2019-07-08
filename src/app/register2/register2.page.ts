import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular"
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service'
// localstorage服务
import { LocalstorageService } from '../services/localstorage.service'
// 请求服务
import { HttpService } from '../services/http.service'
@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {
  public a: boolean = true;
  public isTimeOut: boolean = false;
  public myCode: any = '';
  public number: number = 60;
  public domain: any = 'http://jd.itying.com/';
  public telNum: any;
  constructor(
    public nav: NavController,
    public router: Router,
    public storage: LocalstorageService,
    public http: HttpService,
    public alerter: AlertService
  ) { }

  ngOnInit() {
    this.telNum = this.storage.get('telNum');
  }
  ngAfterViewInit(): void {
    this.doTimer();
  }
  // 返回
  goBack() {
    this.nav.back();
  }
  // 检查code是否者  // 检测
  goPassWord() {
    if (this.myCode !== '') {
      this.http.ajaxPost(this.domain + 'api/validateCode', { 'code': this.myCode, 'tel': this.telNum }).then((data: any) => {
        // 验证是否通过
        if (data.success == true) {
          this.alerter.presentToast(data.message);
          this.storage.set('myCode', this.myCode);
          this.nav.navigateForward('/register3');
        } else {
          this.alerter.presentToast(data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      this.alerter.presentToast('请输入验证码');
    }
  }
  // 倒计时
  doTimer() {
    var timer = setInterval(() => {
      this.number--;
      if (this.number === 0) {
        clearInterval(timer);
        this.isTimeOut = true;
      }

    }, 1000)
  }
  // 重新发送验证码
  reSendCode() {
    this.alerter.presentToast('重新发送验证码到' + this.telNum);
    this.http.ajaxPost(this.domain + 'api/sendCode', { 'tel': this.telNum }).then((data: any) => {
      if (data.success == true) {
        this.doTimer();
        this.isTimeOut = false;
        this.number = 60;
      } else {
        this.alerter.presentToast('发送验证码失败.');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

}
