import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ClassField } from '@angular/compiler/src/output/output_ast';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';



@Injectable()
export class HttpService {
  currentUser = null;

  loginstatus: BehaviorSubject<any[]> = new BehaviorSubject([]);
  checkLogin: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) {
    
    if (localStorage.currentUser !== undefined){
      this.currentUser = JSON.parse(localStorage.currentUser);
      // console.log(this.currentUser);
      // console.log("service's constructor", this.currentUser);
      const data = [{
        user: this.currentUser,
        mesg: null
      }];
      this.updateLoginStatus(data);
    } else {
      const data = [{
        user: null,
        mesg: null
      }];
      this.updateLoginStatus(data);
    }
  }

  updateLoginStatus(data) {
    this.loginstatus.next(data);
  }

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

  createPlan(newplan, callback){
    // console.log("createPlan in service", newplan);
    this._http.post(`/newplan/${this.currentUser._id}`, newplan).subscribe(
      (res: any) => {
        console.log("from service create plan", res);
        callback(res);
        if (res == "success"){
          console.log("succes create plan");
        }
      },
      (err) => {
        console.log(err);
      }
    )
    
      }

  getPendingUser(token, callback){
    this._http.get(`/activate_new/${token}`).subscribe((res: any) => {
      callback(res);
    },(err) => {
      console.log("getPendingUser err:", err);
    })
  }

  login(userdata, callback){
    // console.log('userdata: ', userdata);
    this._http.post('/login', userdata).subscribe(
      (res:any) => {
        console.log('res: ', res);
        callback(res);
        if(res.error === undefined){
          this.currentUser = res;
          localStorage.currentUser = JSON.stringify(res);
          const data = [{
            user: this.currentUser,
            mesg: null
          }];
          this.updateLoginStatus(data);
        }
      },
      (err) => {
        console.log('err from login service: ', err);
      }
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getPlans() {
    return this._http.get("/plans")
    .map(data => data.json())
    .toPromise()
  }

  
}

