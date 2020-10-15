import { AuthService } from './../login/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService :AuthService) { }

  ngOnInit() {

    
  }

  logout(){

    this.authService.logout();
  }

}
