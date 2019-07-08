import { Component, ViewChild } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // 全选
  public isAllChecked: boolean = false;
  @ViewChild('mySlidingOtp') slide;
  @ViewChild('myEdit') myEdit;
  public cartLists: any = [];
  public pNum: number;
  public checkedNum: number = 0;
  public domain: any = 'http://jd.itying.com/';
  public totalPrice: number;  //总价格
  public isEdit: boolean = false;
  public hasData: boolean = true; //是否有数据
  constructor(
    public storage: LocalstorageService,
    public alert: AlertController,
    public nav: NavController,
    public router: Router,
    public alerter: AlertService
  ) {
  }
  ionViewWillEnter() {
    var userInfo = this.storage.get('userinfo');
    if (userInfo) {
      var cartData = this.storage.get('cart_lists');
      if (cartData.length > 0) {
        this.cartLists = this.storage.get('cart_lists')
        this.hasData = true;
      } else {
        this.hasData = false;
      }
      // console.log(this.cartLists);
      this.pNum = this.getPNum();

      this.sumPrice();
      if (this.getCheckedNum() == this.cartLists.length && this.cartLists.length !== 0) {
        this.isAllChecked == true;
      } else {
        this.isAllChecked == false;
      }
    } else {
      this.alerter.presentAlertConfirm("尚未登录，确认跳转到登录页面？", "/login", '/tabs/tab1')
    }

  }

  // 选商品
  changeChecked() {
    // console.log(this.cartLists);
    if (this.getCheckedNum() == this.cartLists.length) {

      this.isAllChecked == true;
    } else {
      this.isAllChecked == false;
    }
    // 计算总价
    this.sumPrice();

  }
  // 删除商品
  async deleteItem(keyword) {
    let index = this.cartLists.indexOf(keyword);
    const alert = await this.alert.create({
      header: '提示',
      mode: 'ios',
      message: '确定删除此商品？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.slide.close();
          }
        }, {
          text: '确定',
          handler: () => {
            this.cartLists.splice(index, 1);
            this.cartLists.length > 0 ? this.hasData = true : this.hasData = false;
            this.storage.set('cart_lists', this.cartLists);
            this.sumPrice();
            this.alerter.presentToast('删除成功！')
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  // 获取商品的数量

  getPNum() {
    var cart_lists: any = this.storage.get('cart_lists');
    var num: number = 0;
    if (cart_lists) {
      // console.log(cart_lists)
      for (let i: any = 0; i < cart_lists.length; i++) {
        num += cart_lists[i].p_count
      }
    }
    return num;
  }
  // 增加商品数量
  addNum(item) {
    console.log(item);
    item.p_count += 1;
    this.sumPrice();
  }
  // 减少商品数量
  deleteNum(item) {
    console.log(item);
    if (item.p_count >= 2) {
      item.p_count -= 1;
      this.sumPrice();
    }
  }
  // 全选
  checkAllProduct() {
    if (this.isAllChecked) { //选中
      for (let i = 0; i < this.cartLists.length; i++) {
        this.cartLists[i].checked = false;
      }
      this.isAllChecked = false;
    } else { //没选中
      for (let i = 0; i < this.cartLists.length; i++) {
        this.cartLists[i].checked = true;
      }
      this.isAllChecked = true;
    }
  }

  // 统计价格 
  sumPrice() {
    var tempPrice: number = 0;
    for (let i = 0; i < this.cartLists.length; i++) {
      if (this.cartLists[i].checked == true) {
        tempPrice += this.cartLists[i].p_price * this.cartLists[i].p_count;
      }
    }
    this.totalPrice = tempPrice;
  }

  // 去结算
  calculateSum() {
    var tempArr: any[] = [];
    var sumPrice: number = 0;
    for (let i = 0; i < this.cartLists.length; i++) {
      if (this.cartLists[i].checked) {
        sumPrice += this.cartLists[i].p_price * this.cartLists[i].p_count;
        tempArr.push(this.cartLists[i]);
      }
    }
    this.storage.set('sumPrice', sumPrice);

    if (tempArr.length > 0) {
      this.storage.set("order_data", tempArr);
      this.router.navigate(['/my-order']);
    } else {
      this.alerter.presentToast('还未选中商品啊！')
    }
    // console.log(tempArr);
  }

  // 获取选中的数量
  getCheckedNum() {
    var sum: number = 0;
    for (let i = 0; i < this.cartLists.length; i++) {
      if (this.cartLists[i].checked == true) {
        sum += 1;
      } else {
        break;
      }

    }
    return sum;
  }


  // 编辑选项
  changeEdit() {
    this.isEdit = !this.isEdit;
    console.log(this.myEdit);
    if (this.isEdit == true) {
      this.myEdit.nativeElement.innerHTML = '完成';
    }
    else {
      this.myEdit.nativeElement.innerHTML = '编辑';
    }

  }
  // 执行删除

  async deleteProduct() {
    const alert = await this.alert.create({
      header: '提示',
      mode: 'ios',
      message: '确定删除这些商品？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            this.slide.close();
          }
        }, {
          text: '确定',
          handler: () => {
            var noCheckedArr = [];
            for (var i = 0; i < this.cartLists.length; i++) {
              if (!this.cartLists[i].checked) {
                noCheckedArr.push(this.cartLists[i]);
              }
            }
            // 改变当前数据
            this.cartLists = noCheckedArr;
            this.cartLists.length > 0 ? this.hasData = true : this.hasData = false;
            this.storage.set('cart_lists', noCheckedArr);
            this.getPNum();
            this.alerter.presentToast('删除成功！')
          }
        }
      ]
    });
    var hasTrue = this.hasCheckedDeleteProduct();
    if (hasTrue) {
      await alert.present();
    }
  }
  // 判断是否有选中要删除的数据
  hasCheckedDeleteProduct() {
    for (var i = 0; i < this.cartLists.length; i++) {
      if (this.cartLists[i].checked) {
        return true;
      }
    }
  }
}
