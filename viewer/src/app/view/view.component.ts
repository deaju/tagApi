import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tweets:object[]=[];
  isShowButton:boolean;
  constructor(private service:ImageService,private auth:AuthService) { 
    setTimeout(()=>{
      let user = this.auth.getCurrentUser();
      if(user.scroll > 0){
        scrollTo(0,user.scroll);
      }
    },100)
    this.service.tweetsChange.subscribe((tweets)=>{
      this.isShowButton=true;
      this.tweets = tweets;
    })
  }

  ngOnInit() {
    this.isShowButton=false;
    this.service.getTweets(1);
  }
  addTweets():undefined{
    this.service.getNextTweets();
    return;
  }


}
