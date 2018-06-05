import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_log = {
    email: "",
    password: "",
  }
  user_name;
  error_message = {
    email: "",
    login: "",
    code: 0
  }

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
  }
  
  login(){
    this._service.login(this.user_log, (res)=>{
      if(res.error == undefined){
        this._service.checkLogin.next(['loged']);
        this._router.navigate(['/'])
      }else{
        this.error_message.login = res.error;
        if(res.errorCode != undefined){
          this.error_message.code = res.errorCode;
        }
      }
    });
    this.user_log = {
      email:'',
      password:''
    }
  }

}
