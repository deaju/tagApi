import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Http,Response } from '@angular/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tweet:object;
  url:string[]=[];
  user:{url:string,name:string,id:string}={url:"",name:"",id:""};
  userURL:string;
  caption:string;
  rt:number;
  like:number;
  id:string;
  isMulti:boolean;
  imageNum:number=0;
  tags:{name:string}[];
  constructor(private auth:AuthService, private service:ImageService,private route: ActivatedRoute,private location:Location,private http:Http) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tweet = this.service.getTweetInfo(this.id)[0];
    if(this.tweet !== undefined){
      this.user = {url:this.tweet['user']['profile_image_url_https'],name:this.tweet['user']['name'],id:this.tweet['user']['screen_name']};
      this.caption = this.tweet['text'].replace(/https:.*/,"");
      this.rt = this.tweet['retweet_count'];
      this.like = this.tweet['favorite_count'];
      if('media' in this.tweet['extended_entities'] ){
        this.url = this.getImage(this.tweet);
        this.isMulti = this.url.length > 1;
      }
      if('tag' in this.tweet){
        this.tags = this.tweet['tag'];
      } else {
        this.tags = [{name:''}];
      }
      
    } else {
      this.location.back();
    }
  }

  getImage(tweet):string[]{
    let urls=[];
    for(let i=0;i<tweet['extended_entities']['media'].length;i++){
      urls.push(tweet['extended_entities']['media'][i]['media_url_https']);
    }
    return urls;
  }
  onBack():undefined{
    this.location.back();
    return;
  }
  nextImage():undefined{
    this.imageNum++;
    if(this.imageNum >= this.url.length){
      this.imageNum = 0;
    }
    return
  }
  backImage():undefined{
    this.imageNum--;
    if(this.imageNum < 0){
      this.imageNum = this.url.length-1;
    }
    return;
  }

}
