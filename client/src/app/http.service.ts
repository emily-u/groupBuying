import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class HttpService {
  currentUser = null;

  checkLogin: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }

  regisUser(data, callback) {
    this._http.post('/register', data).subscribe(
      (res: any) => {
        console.log("from service register: ", res.success);
        callback(res);
        if (res.success == 'register pending') {
          console.log("success register");
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getPendingUser(token, callback){
    this._http.get(`activate_new/${token}`).subscribe((res: any) => {
      callback(res);
    },(err) => {
      console.log("getPendingUser err:", err);
    })
  }

  login(userdata, callback){
    this._http.post('/login',userdata).subscribe(
      (res:any) => {
        callback(res.json());
        if(res.json().error === undefined){
          this.currentUser = res.json();
          localStorage.currentUser = JSON.stringify(res.json());

          
        }
      }
    )

  }
}

