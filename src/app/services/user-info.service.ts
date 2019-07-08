import { Injectable } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service'
import { Md5 } from 'ts-md5/dist/md5'
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(public storage: LocalstorageService) { }

  getUserInfo() {
    var userinfo = this.storage.get('userinfo');
    return userinfo;
  }

  sign(json) {
    var tempArr: any = [];
    for (let attr in json) {
      tempArr.push(attr);
    }
    // 排序
    tempArr = tempArr.sort();
    var tempStr = '';
    for (let i = 0; i < tempArr.length; i++) {
      tempStr += tempArr[i] + json[tempArr[i]];
    }
    return Md5.hashStr(tempStr);
  }
}
