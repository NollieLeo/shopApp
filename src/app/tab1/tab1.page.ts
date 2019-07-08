import { Component, ViewChild } from '@angular/core';
import { HttpService } from "../services/http.service"
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('slideBar') slide;
  @ViewChild('hello') hello;
  public imgLists: any[] = [];
  public liWidth: any = '';
  public hotLists: any[] = [];
  public guessLikeLists: any[] = [];
  slideOpts = {
    effect: 'fade',
    speed: 600,
    loop: false, autoplay: { delay: 4000 },
    scrollbar: true
  }
  public domain: any = 'http://jd.itying.com/';
  constructor(public http: HttpService) {
    console.log(this.hello)

  }
  ngOnInit(): void {

    // 自适应
    this.liWidth = (Math.floor((window.screen.width) / 2) - 10) + 'px';
    console.log(this.liWidth);
    // 轮播图请求数据
    this.http.ajaxGet(this.domain + 'api/focus').then((data: any) => {
      // console.log(data.result);
      this.imgLists = data.result;
    }).catch((err) => {
      console.log('failed to load the motherFucker web')
    })
    // 渲染数据 请求精品推荐数据
    this.http.ajaxGet(this.domain + 'api/plist?is_best=1').then((data: any) => {
      console.log('--------精品推荐数据-------');
      console.log(data.result);
      this.hotLists = data.result;
    }).catch((err) => {
      console.log('failed to load the motherFucker web')
    })
    // 猜你喜欢数据
    this.http.ajaxGet(this.domain + 'api/plist?is_hot=1').then((data: any) => {
      console.log('-------猜你喜欢数据--------');
      console.log(data.result);
      this.guessLikeLists = data.result;
    }).catch((err) => {
      console.log('failed to load the motherFucker web')
    })
  }

  doSlide() {
    this.slide.startAutoplay();
  }


}
