import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  plans = {
    company: '',
    costPerMonth: '',
    line: '',
    // withContract: '',
    description: '',
  }
  planList;
  logged_user_id;
  error_message = {
    joinPlan: '',
  };

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    this._service.getPlans()
    .subscribe(
      (planList)=>{ 
        // console.log('planList: ', planList[0]);
        this.planList = planList },
      (err)=>{ console.log(err); }
      );

      if (this._service.currentUser !== null) {
        // console.log('this._service.currentUser: ', this._service.currentUser);
        this.logged_user_id = this._service.currentUser._id;
        // console.log("logged_user_id", this.logged_user_id);
      }
  }

  joinPlan(plan_id){
    // console.log("joinPlan in ts",id);
    this._service.joinPlan(this.logged_user_id, plan_id)
    .subscribe(
      (data)=>{ 
        if(data){
          console.log(data);
          this._service.updateGroupCompleted(["update group"]);
          this._service.getPlans()
          .subscribe(
            (planList)=>{ 
              // console.log('planList: ', planList[0]);
              this.planList = planList },
            (err)=>{ console.log(err); }
            );
        }
       },
      (err)=>{ this.error_message.joinPlan = err.error },
    )
  }

  

}
