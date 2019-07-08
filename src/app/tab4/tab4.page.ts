import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service'
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public isLogin: boolean;
  public userinfo: any;
  public username: any;

  constructor(public storage: LocalstorageService) {

  }
  ngDoCheck() {
    // console.log("hello ngDoCheck");
    if (this.storage.get('userinfo')) {
      this.userinfo = this.storage.get('userinfo');
      this.username = this.userinfo[0].username;
    }
    this.isLogin = this.storage.get('isLogin');
  }

  ngOnInit() {

    console.log("hello ngOnInit");
  }

}
