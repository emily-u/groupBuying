import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged_user;
  user_log = {
    email: '',
    password: ''
  };

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    if (this._service.currentUser !== null) {
      this.logged_user = this._service.currentUser.name;
      this.user_log.email = this._service.currentUser.email;
      this.user_log.password = this._service.currentUser.password;
      // console.log('THIS.USER_LOG.EMAIL: ', this.user_log.email);
    }

    $("#nav-about").click(function() {
      $('html,body').animate({
          scrollTop: $("#showAbout").offset().top},
          'slow');
  });

    $("#nav-plans").click(function() {
      $('html,body').animate({
          scrollTop: $("#showAllPlans").offset().top},
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
