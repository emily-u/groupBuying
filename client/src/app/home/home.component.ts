import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private _service: HttpService, private _router: Router) { }

  ngOnInit() {
    $("button").click(function() {
      $('html,body').animate({
          scrollTop: $("#showAllPlans").offset().top},
          'slow');
  });
  }

}
