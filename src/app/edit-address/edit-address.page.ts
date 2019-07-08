import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../services/http.service';
import { UserInfoService } from '../services/user-info.service'
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  public addressLists: any = {
    name: '',
    phone: '',
    address: ''
  }
  public id:any;
  public domain: any = 'http://jd.itying.com/';
  constructor(public nav: NavController, public activeRouter: ActivatedRoute, public http: HttpService, public user: UserInfoService) { }
  ionViewWillEnter() {
    this.activeRouter.queryParams.subscribe((data: any) => {
      console.log(data);
      this.id = data._id;
      this.addressLists.name = data.name;
      this.addressLists.phone = data.phone;
      this.addressLists.address = data.address;
    })
  }
  ngOnInit() {

  }
  goBack() {
    this.nav.back();
  }

  //编辑地址 
  editNowAddress() {
    if (this.addressLists.name != '' && this.addressLists.phone != '' && this.addressLists.address != '') {
      let userInfo = this.user.getUserInfo()[0];
      let json = {
        id:this.id,
        uid: userInfo._id,
        salt: userInfo.salt,
        name: this.addressLists.name,
        phone: this.addressLists.phone,
        address: this.addressLists.address
      }
      let sign = this.user.sign(json); //生成签名
      var api = 'api/editAddress'
      this.http.ajaxPost(this.domain + api, {
        id:this.id,
        uid: userInfo._id,
        sign: sign,
        name: this.addressLists.name,
        phone: this.addressLists.phone,
        address: this.addressLists.address
      }).then((data: any) => {
        console.log(data);
        if (data.success) {
          this.nav.navigateBack('/my-address');
        } else {
          alert("保存失败");
        }
      })
    } else {
      alert('必选项不能为空')
    }
  }
}

