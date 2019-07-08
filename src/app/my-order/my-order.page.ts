import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service'
import { UserInfoService } from '../services/user-info.service';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  public domain: any = 'http://jd.itying.com/';
  public buy_lists: any = [];
  public userInfo: any;
  public defaultAddress: any;
  public sumPrice: number = 0;
  constructor(
    public storage: LocalstorageService,
    public getUserInfo: UserInfoService,
    public http: HttpService,
    public router: Router,
    public alerter: AlertService
  ) { }
  // 返回到上一页
  goBack() {
    this.router.navigate(['/tabs/tab3']);
  }
  ionViewWillEnter() {
    this.sumPrice = this.storage.get('sumPrice');
    if (this.storage.get('userinfo')) {
      this.userInfo = this.getUserInfo.getUserInfo()[0];
    }
    this.buy_lists = this.storage.get('order_data');
    // console.log(this.buy_lists);
    this.getDefaultAddress();

  }
  ngOnInit() {
  }

  // 获取用户的默认地址

  getDefaultAddress() {
    //签名
    var json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt
    }
    let sign = this.getUserInfo.sign(json);
    let api = 'api/oneAddressList?uid=' + this.userInfo._id + '&sign=' + sign;
    this.http.ajaxGet(this.domain + api).then((data: any) => {
      if (data.success) {
        this.defaultAddress = data.result[0];
      } else {
        this.alerter.presentToast("获取数据失败");
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // 提交订单
  goPay() {
    if (!this.userInfo) {
      this.alerter.presentToast("用户未登陆");
      this.router.navigate(['/login']);
    } else if (!this.defaultAddress) {
      this.alerter.presentToast('收货地址为空');
    }
    else {
      //提交订单
      
    }
  }
}
