import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import { HttpService } from "../services/http.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  public domain: any = 'http://jd.itying.com/';
  public flag: boolean = true; //关键词开关
  public lists: any = [];
  public cid: any = '';
  public page: number = 1;
  public more: boolean = true;
  public hasData: boolean = true;
  constructor(public nav: NavController, public route: ActivatedRoute, public http: HttpService) {
  }

  ngOnInit() {
    // 路由传值
    this.route.queryParams.subscribe((data) => {
      this.cid = data.id;
      this.getPLists('');
    })
  }



  goBack() {
    this.nav.back();
  }

  getPLists(e) {
    this.http.ajaxGet(this.domain + "api/plist?cid=" + this.cid + '&page=' + this.page).then((data: any) => {
      console.log(data);
      
      if (data.result.length < 1) {
        e.target.disabled = true;
        this.more = false;
        this.hasData = false;
      }
      this.lists = this.lists.concat(data.result);
      this.page++;
      // if(e){
      //   this.hasData = true;
      // }
      e ? e.target.complete() : '';
    })
  }


}
