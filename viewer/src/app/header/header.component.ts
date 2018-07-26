import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '../auth.service';
import { Http,Response } from '@angular/http';
import { API_ENDPOINT } from '../../environments/environment';
import {User} from '../../lib/user';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile:string;
  users:User[];
  loginURL:string;
  constructor(private router:Router,private auth:AuthService,private http:Http,private image:ImageService) { }

  ngOnInit() {
    this.users = this.auth.getUsers();
    this.http.get(API_ENDPOINT+'/get_accesstoken').subscribe((res:Response)=>{
      this.loginURL = res.text();
    });
  }

  focus():undefined{
    this.router.navigate(["/search"]);
    return;
  }
  logout():undefined{
    this.image.deleteTweets();
    this.auth.logout();
    this.image.getTweets(1);
    return;
  }
  clickIcon(i:number):undefined{
    this.auth.switchUser(i);
    this.image.getTweets(1);
    return;
  }
}
