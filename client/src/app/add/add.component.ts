import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  logged_user;
  newplan = {
    company: '',
    costPerMonth: '',
    line: '',
    withContract: '',
    description: '',
  };
  err_message: '';


  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    this.logged_user = this._service.currentUser.name;
    console.log("this.logged_user", this.logged_user);
  }

  createPlan() {
    this._service.createPlan(this.newplan)
      .subscribe(
      (data) => {
        if(data) {
          this._router.navigate(['/']);
          this.newplan = {
                company: '',
                costPerMonth: '',
                line: '',
                withContract: '',
                description: '',
              }
        }
      },
      (err) => { this.err_message = err.error }
      )
  }

}
