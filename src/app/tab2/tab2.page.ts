import { Component } from '@angular/core';
import { HttpService } from '../services/http.service'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cateLists: any = [];
  public cateListsContent: any = [];
  public domain: any = 'http://jd.itying.com/';
  public cateId: any;
  public domain2: any = 'api/pcate?pid=59f1e1ada1da8b15d42234e9'
  constructor(public http: HttpService) { }
  ngOnInit(): void {
    // 获取分类列表数据
    this.getLeftData();
  }


  getLeftData() {
    this.http.ajaxGet(this.domain + "api/pcate").then((data: any) => {
      // console.log(data);
      this.cateLists = data.result;
      // 调用右侧分类
      this.getRightData(data.result[0]._id, data.result[0].title)
    }).catch((err) => {
      console.log("motherfuck")
    })
  }

  getRightData(id, title) {
    // console.log("------" + title + "-----" + id + "---数据为:");
    this.http.ajaxGet(this.domain + 'api/pcate?pid=' + id).then((data: any) => {
      this.cateListsContent = data.result;
      // console.log(data.result);
    })
  }

}
