import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'
import { UserInfoService } from '../services/user-info.service';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  public addressLists: any = {
    name: '',
    phone: '',
    address: ''
  };
  public domain: any = 'http://jd.itying.com/';
  constructor(public nav: NavController, public http: HttpService, public user: UserInfoService) { }

  ngOnInit() {
  }
  goBack() {
    this.nav.back();
  }
  addNewAddress() {
    if (this.addressLists.name != '' && this.addressLists.phone != '' && this.addressLists.address != '') {
      let userInfo = this.user.getUserInfo()[0];
      let json = {
        uid: userInfo._id,
        salt: userInfo.salt,
        name: this.addressLists.name,
        phone: this.addressLists.phone,
        address: this.addressLists.address
      }
      let sign = this.user.sign(json); //生成签名
      var api = 'api/addAddress'
      this.http.ajaxPost(this.domain + api, {
        uid: userInfo._id,
        sign: sign,
        name: this.addressLists.name,
        phone: this.addressLists.phone,
        address: this.addressLists.address
      }).then((data: any) => {
        console.log(data);
        if(data.success){
          this.nav.navigateBack('/my-address');
        }else{
          alert("添加失败");
        }
      })
    }else{
      alert('必选项不能为空')
    }
  }
}
