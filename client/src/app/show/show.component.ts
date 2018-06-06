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
    withContract: '',
    description: '',
  }
  planList;

  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    this._service.getPlans()
    .then((plans)=>{
      // console.log('plans: ', plans);
      this.planList = plans;
    })
    .catch(err=>{console.log("err: ", err);})
  }

}
