import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from "../services/http.service";
import { ActivatedRoute } from "@angular/router";
import { ViewChild, ElementRef } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../services/alert.service'
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  // 商品数量
  public pNum: number = 1;
  // 购物车数量
  public cart_num: number;
  public cart_lists: any;
  // 获取属性dom
  @ViewChild('mySpan') mySpan: ElementRef;
  public tabs: any = 'tab1';
  public pId: any = '';
  public domain: any = 'http://jd.itying.com/';
  public pDetail: any[] = [];
  public hasAttr: any;
  public userInfo: any;
  public storageData: any;
  constructor(
    public nav: NavController,
    public http: HttpService,
    public route: ActivatedRoute,
    public storage: LocalstorageService,
    public alerter: AlertService,
    public alertController: AlertController) {
    this.cart_num = this.getPNum();
  }
  ionViewDidEnter() {
    this.bindEvent();
    this.storageData = this.storage.get('cart_lists');
    this.userInfo = this.storage.get('userinfo');
  }
  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.pId = data.id;
    })


    this.loadData();

  }

  goBack() {
    this.nav.back();
  }

  loadData() {
    this.http.ajaxGet(this.domain + 'api/pcontent?id=' + this.pId).then((data: any) => {
      // console.log(data.result);
      if (data.result.attr.length !== 0) {
        this.hasAttr = false;
      } else {
        this.hasAttr = true;
      }
      this.pDetail = data.result;

    })

  }

  bindEvent() {
    // console.log(this.mySpan.nativeElement);
    if (this.hasAttr == false) {
      if (this.mySpan.nativeElement) {
        var spanDom: any = this.mySpan.nativeElement;
        spanDom.onclick = function (e) {
          // console.log(e.srcElement.nodeName);//元素名称 
          // console.log(e.target); // dom节点
          if (e.srcElement.nodeName == 'SPAN') {
            var ele: any = e.target;
            var parentNode: any = ele.parentNode;
            var children: any = parentNode.children;
            for (let i = 0; i < children.length; i++) {
              children[i].className = '';

            }
            ele.className = 'active-span';
          }
        }
      }
    }


  }
  plusNum() {
    this.pNum++;
  }
  deleteNum() {
    if (this.pNum > 1) {
      this.pNum--;
    }
  }

  // 加入购物车
  addCart() {
    // 生成签名
    var title: any = this.pDetail['title'];
    var pId: any = this.pDetail['_id'];
    var p_pic: any = this.pDetail['pic'];
    var p_price: any = this.pDetail['price'];
    var p_count: number = this.pNum;
    // 商品属性
    var p_attr: any = '';
    var active_p: any = document.querySelectorAll('#mySpan .active-span')
    for (var i = 0; i < active_p.length; i++) {
      p_attr += active_p[i].innerHTML;
    }
    var json = {
      "title": title,
      "pId": pId,
      "p_pic": p_pic,
      "p_price": p_price,
      "p_count": p_count,
      "p_attr": p_attr,
      "checked": true
    }
    console.log(json);
    if (this.userInfo) {
      if (this.storageData) {
        // 判断购物车里面有没有数据
        if (this.hasData(this.storageData, json.pId, p_attr)) {
          // 购物车有数据
          // 更新数量
          for (let i = 0; i < this.storageData.length; i++) {
            if (this.storageData[i].pId == json.pId && this.storageData[i].p_attr == json.p_attr) {
              this.storageData[i].p_count += p_count;
            }
          }
        } else {
          // 购物车无数据
          this.storageData.push(json)
        }
        this.storage.set('cart_lists', this.storageData);
        this.cart_num += p_count;
      } else {
        var tempArr = [];
        tempArr.push(json);
        this.storage.set('cart_lists', tempArr);
      }
      this.alerter.presentToast('加入购物车成功!!!!!');
    } else {
      this.alerter.presentAlertConfirm('尚未登录，是否跳转到登录界面？', '/login', '')
    }
  }

  // 判断购物车的数据

  hasData(storageData: any, pId: any, p_attr: any) {
    if (storageData) {
      for (let i = 0; i < storageData.length; i++) {
        if (storageData[i].pId == pId && storageData[i].p_attr == p_attr) {
          return true;
        }
      }
    }

    return false;
  }

  // 获取商品的数量

  getPNum() {
    var cart_lists: any = this.storage.get('cart_lists');
    var num: number = 0;
    if (cart_lists) {
      console.log(cart_lists)
      for (let i: any = 0; i < cart_lists.length; i++) {
        num += cart_lists[i].p_count
      }
    }
    return num;
  }
}
