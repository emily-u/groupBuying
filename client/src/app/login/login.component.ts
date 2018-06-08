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

  login() {
    this._service.login(this.user_log)
      .subscribe(
      (data) => {
        if (data.error === undefined) {
          // console.log(data);
          this._service.checkLogin.next(['loged']);
          if (data.isAdmin) {
            this._router.navigate(['/admin'])
          } else {
            this._router.navigate(['/'])
          }
        }
        else {
          this.error_message.login = data.error;
        }
      }
      )
  }

}
