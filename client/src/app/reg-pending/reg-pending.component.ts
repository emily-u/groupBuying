import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reg-pending',
  templateUrl: './reg-pending.component.html',
  styleUrls: ['./reg-pending.component.css']
})
export class RegPendingComponent implements OnInit {
  user_log = {
    email: "",
    password: "",
  }
  user_name;
  error_message = {
    email: "",
    login: "",
    code: 0,
    getPendingUser:""
  }

  constructor(private _service: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._service.getPendingUser(params.get("token"))
      .subscribe(
        (data)=>{
          this.user_name = data.user.name;
          // console.log(data);
        }
      ),
      (err)=>{ this.error_message.getPendingUser = err.error },
      ()=>{}
    })
  }

  login(){
    this._service.login(this.user_log)
    .subscribe(
      (data) => { 
        if(data){
          console.log(data);
          this._service.checkLogin.next(['loged']);
          this._router.navigate(['/'])
        } 
       },
      (err) => { 
        this.error_message.login = err.error;
        if(err.errorCode != undefined){
          this.error_message.code = err.errorCode;
        } 
        
      },
      () => { this.user_log = {
        email:'',
        password:''
      } }
    )
  }

}
