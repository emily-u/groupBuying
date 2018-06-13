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
  user_isAdmin;
  user_log = {
    email: '',
    password: ''
  };
  theUser;
  theUser_id;
  plans_user_joined;

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    
    if (this._service.currentUser !== null) {
      // console.log('this._service.currentUser: ', this._service.currentUser);
      this.logged_user = this._service.currentUser.name;
      this.user_isAdmin = this._service.currentUser.isAdmin;
      this.user_log.email = this._service.currentUser.email;
      this.user_log.password = this._service.currentUser.password;
      this.user_log = this._service.currentUser;
      this.theUser_id = this._service.currentUser._id;
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

  this._service.getCurrentUser(this.theUser_id)
  .subscribe(
    (user)=>{
      this.theUser = user;
      this.plans_user_joined = user.joined_plan.length;
    },
    (err)=>{console.log(err);}
  )
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
