import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {
  user_reg = {
    name: '',
    email: '',
    password: ''
  };
  confirm_password;
  err_message = {
    email: '',
  };

  constructor(private _service: HttpService, private _router: Router) {
    this.userReg();
  }

  userReg() {
    this._service.regisUser(this.user_reg)
      .subscribe(
      (data) => {
        if (data) {
          this._router.navigate(['/checkEmail']);
          this.user_reg = {
            name: '',
            email: '',
            password: '',
          }
        }
      },
      (err) => { this.err_message.email = err.error }
      )
  }



  ngOnInit() {
  }

}
