import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular";
import { HttpService } from "../services/http.service";
import { AlertController } from '@ionic/angular';
import { LocalstorageService } from "../services/localstorage.service"
@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.page.html',
  styleUrls: ['./product-lists.page.scss'],
})
export class ProductListsPage implements OnInit {
  @ViewChild('mySlidingOtp') slide;
  public flag: boolean = false; //关键词开关
  public lists: any = [];
  public keywords: any = '';
  public domain: any = 'http://jd.itying.com/';
  public page: number = 1;
  public more: boolean = true;
  public hasData: boolean = true;  //是否有数据
  public noData: boolean = true;
  public historyLists: any[] = [];

  constructor(public nav: NavController, public http: HttpService, public storage: LocalstorageService, public alertController: AlertController) { }

  ngOnInit() {
    // 获取历史记录
    this.getHistory();
  }
  // 跳转到先前的页面
  goBack() {
    this.nav.back();
  }


  // 搜索商品,以及下拉加载更多
  searchNow(e) {
    // this.flag = !this.flag;
    if (e) {
      if (this.flag === false) {
        e.target.disabled = true;
      }
    }
    if (!e) {
      this.page = 1;
      this.hasData = true;
      this.more = true;
      if (this.keywords !== '' && this.keywords !== ' ') {
        this.saveHistory();
      }
    }
    // console.log(e);
    // console.log(this.keywords);
    if (this.keywords !== '' && this.keywords !== ' ') {
      this.http.ajaxGet(this.domain + "api/plist?search=" + this.keywords + "&page=" + this.page).then((data: any) => {
        // console.log(data);
        if (data.result.length < 1) {
          this.noData = false;
          this.hasData = false;
        } else {
          this.noData = true;
        }
        if (this.page == 1) {
          this.lists = data.result;
        } else {
          this.lists = this.lists.concat(data.result);
        }
        this.flag = true;

        if (e) {
          this.noData = true;
          e.target.complete()
          if (data.result.length < 2) {
            e.target.disabled = true;
            this.hasData = false;
            this.more = false;
          }
        }
        this.page++;
      })
    }
  }

  loadMore(e) {
    this.searchNow(e);
  }



  // 保存历史记录
  saveHistory() {
    // 1. 获取历史记录
    let historyData = this.storage.get('historyData');

    // 2.判断搜索数据是否曾经存在历史记录中
    if (historyData) { //有历史记录
      if (historyData.indexOf(this.keywords) === -1) { //里面没有这个搜索值
        historyData.push(this.keywords);
        this.storage.set('historyData', historyData);
      }
    } else { //以前没有
      this.historyLists.push(this.keywords);
      this.storage.set('historyData', this.historyLists);
    }
    // 3. 没有就拼接，有就不做操作
  }

  // 加载历史记录
  getHistory() {
    let history = this.storage.get('historyData');
    if (history) {
      this.historyLists = history;
    }
  }


  // 点击历史记录加载
  goSearchHistory(historyKeywords) {
    this.keywords = historyKeywords;
    console.log(historyKeywords);
    this.searchNow('');
  }

  // 删除
  async deleteItem(historyKeywords) {
    let index = this.historyLists.indexOf(historyKeywords);
    const alert = await this.alertController.create({
      header: '提示',
      // cssClass:'danger',
      message: '确认删除 <strong>' + historyKeywords + '</strong> 这条记录吗？',
      mode: 'ios',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.slide.closeOpened();
            
          }
        }, {
          text: '确认',
          handler: () => {
            this.historyLists.splice(index, 1);
            this.storage.set("historyData", this.historyLists);
            console.log(index);
          }
        }
      ]
    });

    await alert.present();
  }
}
