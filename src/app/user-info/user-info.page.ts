import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  constructor(public nav: NavController,
    public storage: LocalstorageService,
    public aleter: AlertService
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.nav.back();
  }

  loginOut() {
    if (this.storage.get('userinfo')) {
      this.storage.remove('userinfo');
      this.storage.set('isLogin', false);
      this.nav.navigateForward('/tabs/tab4');
      this.aleter.presentToast('退出登录成功!');
    }else{
      this.aleter.presentToast('退出登录失败!')
    }
  }
}
