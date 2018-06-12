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
  logged_user_id;
  user_log = {
    email: '',
    password: '',
  };
  planList_length;
  totalUsers_length;
  completed_groups = 0;
  user_joined_plan = 0;
  plans_created_by_user;

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    // console.log(this._service.currentUser);
    if (this._service.currentUser !== null) {
      this.logged_user = this._service.currentUser.name;
      this.user_log.email = this._service.currentUser.email;
      this.user_log.password = this._service.currentUser.password;
      this.logged_user_id = this._service.currentUser._id;
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

  this._service.getPlans()
  .subscribe(
    (planList)=>{
      this.planList_length = planList.length;
      // console.log("7",planList);
      let count1 = 0;
      let user_joined_plan = 0;
      for(var i = 0; i<planList.length; i++){
        if(planList[i].completed == true){
          count1 += 1;
          // console.log("plan completed: ", this.completed_groups);
        }
        this.completed_groups = count1;
        if(planList[i].joinedBy){
          user_joined_plan += planList[i].joinedBy.length;
          // console.log("this.user_joined_plan",this.user_joined_plan);
        }
        this.user_joined_plan = user_joined_plan;
      }
      
    },
    (err)=>{ console.log(err); }
  )

  this._service.update_group_completed.subscribe((res) => {
    // console.log(res);
    this._service.getPlans()
    .subscribe(
      (planList)=>{
        this.planList_length = planList.length;
        // console.log("7",planList);
        let count = 0;
        let user_joined_plan = 0;
        for(var i = 0; i<planList.length; i++){
          if(planList[i].completed == true){
            count += 1;
            // console.log("plan completed: ", this.completed_groups);
          }
          this.completed_groups = count;
          if(planList[i].joinedBy){
            user_joined_plan += planList[i].joinedBy.length;
            // console.log("this.user_joined_plan",this.user_joined_plan);
          }
          this.user_joined_plan = user_joined_plan;
        }
        
      },
      (err)=>{ console.log(err); }
    )
  })

  this._service.getTotalUsers()
  .subscribe(
    (totalUsers)=>{
      this.totalUsers_length = totalUsers.length;
      // console.log("3434",totalUsers);
    },
    (err)=>{ console.log(err); }
  )

  this._service.getCurrentUser(this.logged_user_id)
  .subscribe(
    (user)=>{
      // console.log("2567", user);
      this.plans_created_by_user = user.created_plan.length;
    },
    (err)=>{console.log(err);}
  )

  }

  logout(){
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


