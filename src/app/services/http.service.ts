import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(public http: HttpClient) { }

  ajaxGet(api) {
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((response) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

  ajaxPost(api, json) {
    return new Promise((resolve, reject) => {
      this.http.post(api, JSON.stringify(json), this.httpOptions).subscribe((response:any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }
}
