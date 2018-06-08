import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  logged_user;
  user_log = {
    email: '',
    password: ''
  };

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    if (this._service.currentUser !== null) {
      // console.log('this._service.currentUser: ', this._service.currentUser);
      this.logged_user = this._service.currentUser.name;
      this.user_log.email = this._service.currentUser.email;
      this.user_log.password = this._service.currentUser.password;
      // console.log('THIS.USER_LOG.EMAIL: ', this.user_log.email);
    }

    $("#admin-nav-data").click(function() {
      $('html,body').animate({
          scrollTop: $("#admin-data").offset().top},
          'slow');
  });

    $("#admin-nav-chart").click(function() {
      $('html,body').animate({
          scrollTop: $("#admin-chart").offset().top},
          'slow');
  });
  }
  logout(){
    // console.log("logout button pressed", this.logged_user);
    this._service.logout();
    this.logged_user = undefined;
    const data = [{
      user:null,
      mesg:null
    }]
    this._service.updateLoginStatus(data);
    this._service.checkLogin.next(['logout']);
  }
}


