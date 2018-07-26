import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from './image.service';
import {User} from '../lib/user';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  users:User[] = [];
  currentUserIndex:number = -1;
  constructor( private router: Router,private http:Http) {  
    let storageUsers = JSON.parse(localStorage.getItem('info'));
    if(storageUsers != null){
      for(let i=0;i < storageUsers.length; i++){
        let user = new User(storageUsers[i],this.http);
        this.users.push(user);
        if(user.isCurrent()){
          this.currentUserIndex = i;
        } 
      }
    }
  }

  login():undefined{
    return;
  }

  isLogin():boolean{
    return this.currentUserIndex >= 0 ;
  }

  switchUser(userNum:number):undefined{
    this.users[this.currentUserIndex].changeCurrent();
    this.users[userNum].changeCurrent();
    this.currentUserIndex = userNum;
    return;
  }
  getUsers():User[]{
    return this.users;
  }
  getCurrentUser():User{
    return this.users[this.currentUserIndex];
  }
  getCurrentToken():object{
    let user = this.users[this.currentUserIndex];
    return {  
      access_token:user.token,
      access_token_secret:user.tokenSecret
    };
  }

  logout():undefined{
    this.users.splice(this.currentUserIndex,1);
    if(this.users.length >0 ){
      this.currentUserIndex = 0;
      this.users[this.currentUserIndex].changeCurrent();
      localStorage.setItem('info',JSON.stringify(this.users.map(user => user.toSaveObject())));
    } else {
      this.currentUserIndex = -1;
      localStorage.removeItem('info');
      this.router.navigate(["/login"]);
    }
    return;
  }

}
