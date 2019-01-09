import { Component, OnInit } from '@angular/core';
import {API_ENDPOINT } from '../../environments/environment'
import { Http,Response } from '@angular/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUrl:string;
  constructor(private http:Http,private auth:AuthService,private router: Router) { }

  ngOnInit() {
    if(this.auth.isLogin()){
      this.router.navigate(["/list"]);
    } else {
      this.http.get(API_ENDPOINT+'/get_accesstoken').subscribe((res:Response)=>{
        this.loginUrl = res.text();
      });
    }
  }

}
