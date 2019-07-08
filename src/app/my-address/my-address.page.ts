import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserInfoService } from '../services/user-info.service';
import { HttpService } from '../services/http.service';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'
@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.page.html',
  styleUrls: ['./my-address.page.scss'],
})
export class MyAddressPage implements OnInit {
  public domain: any = 'http://jd.itying.com/';
  @ViewChild('mySlide') slide;
  public userInfo: any;
  public myAddressLists: any;
  constructor(public nav: NavController, public user: UserInfoService, public http: HttpService, public storage: LocalstorageService, public alertController: AlertController, public router: Router) { }

  ngOnInit() {


  }
  ionViewWillEnter() {
    if (this.storage.get('userinfo')) {
      this.userInfo = this.user.getUserInfo()[0];
    }
    // console.log(this.userInfo);
    this.getUserAddress();
  }
  goBack() {
    this.nav.navigateBack('/my-order');
  }
  // 获取用户全部地址
  getUserAddress() {
    // 签名
    let json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt,
    }
    let sign = this.user.sign(json);
    // 请求数据
    var api = 'api/addressList?uid=' + this.userInfo._id + '&sign=' + sign;
    this.http.ajaxGet(this.domain + api).then((data: any) => {
      // console.log(data);
      if (data.success) {
        this.myAddressLists = data.result;
      } else {
        console.log(data);
        alert('请求出错');
      }
    });

  }

  // 改变收获地址
  changeDefaultAddress(id) {
    // console.log(id);
    var api = 'api/changeDefaultAddress';
    //生成签名
    let json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt,
      id: id
    }
    let sign = this.user.sign(json);
    this.http.ajaxPost(this.domain + api, {
      uid: this.userInfo._id,
      sign: sign,
      id: id
    }).then((data: any) => {
      // console.log(data);
      if (data.success) {
        this.nav.navigateBack('/my-order');
      }
    })
  }
  // 删除地址，包括弹框
  async deleteAddress(key: any, id: any) {
    const alert = await this.alertController.create({
      header: '提示!',
      mode: 'ios',
      message: '确定删除这个地址吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
            console.log(key);
            // e.closeOpened();
          }
        }, {
          text: '确定',
          handler: () => {
            this.slide.closeOpened();
            this.deleteFromServer(id, key);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  // 从服务器删除
  deleteFromServer(id, key) {
    var api = 'api/deleteAddress';
    var json = {
      uid: this.userInfo._id,
      salt: this.userInfo.salt,
      id: id
    }
    let sign = this.user.sign(json);
    this.http.ajaxPost(this.domain + api, {
      uid: this.userInfo._id,
      sign: sign,
      id: id
    }
    ).then((data: any) => {
      console.log(data);
      if (data.success) {
        this.myAddressLists.splice(key, 1)
      } else {
        alert(data.message);
      }
    })

  }

  goToEdit(item) {
    var NavigationExtras: NavigationExtras = {
      queryParams: item,
      fragment: 'anchor'
    }
    // console.log(item);
    this.router.navigate(["/edit-address"], NavigationExtras);
  }
}
