import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ActivatedRoute } from '@angular/router'; //传值
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public telNum: any = '';
  public password: any = '';
  public domain: any = 'http://jd.itying.com/';
  public isLogin: boolean = false;
  public histroy: any = ''
  constructor(public nav: NavController,
    public http: HttpService,
    public storage: LocalstorageService,
    public activeRoute: ActivatedRoute,
    public alerter: AlertService,
    public router:Router
    ) {
  }
  ionViewWillEnter() {
    this.telNum = this.storage.get('telNum');
  }
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((data: any) => {
      // console.log(data.histroy);
      this.histroy = data.histroy;
    })

  }
  goBack() {
    this.router.navigate(['/tabs/tab4']);
  }
  doLogin() {
    if (this.telNum !== '' && this.password !== '') {
      if (this.telNum.length < 6) {
        this.alerter.presentToast('用户名不合法');
      } else {
        this.http.ajaxPost(this.domain + 'api/doLogin', { 'username': this.telNum, 'password': this.password }).then((data: any) => {
          // console.log(data);
          if (data.success === true) {
            if (this.histroy == "order") {
              this.nav.navigateRoot('/my-order');
            } else {
              this.nav.navigateRoot('/tabs/tab4');
            }
            this.isLogin = true;
            this.storage.set('userinfo', data.userinfo);
            this.storage.set('isLogin', this.isLogin);
            this.storage.set('telNum', this.telNum);
            this.alerter.presentToast(data.message);
          } else {
            this.alerter.presentToast(data.message)
          }
        })
      }
    } else {
      this.alerter.presentToast('账户或密码不能为空！');
    }
  }
}
