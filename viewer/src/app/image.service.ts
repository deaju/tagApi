import { Injectable } from '@angular/core';
import { Image } from './image-list/image-list.class';
import { Http, Request, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {
  readonly SERVER:string = 'http://localhost:5000';
  private user:string;
  private page:string;
  private count:string;
  private tweets: object[] ;


  constructor(private http:Http) {
    this.user = 'pit359';
    this.page = '1';
    this.count = '10';
  }

  getTweet(): Observable<any> {
    let url = this.getTweetUrl(this.page,this.count);

    return this.http.get(url).map((res:Response)=>{
      return res.json();
    });
    //this.tweets = this.dummyTweet();
    //return this.dummyTweet();
  }
  getTweetUrl(page:string,count:string):string{
    //return './assets/dummyTweet.json'
    return this.SERVER + '/twitter/'+this.user+'/tweet?page='+page+'&count='+count;
  }

  getImageTagList():{name:string}[]{
    let tags = [];
    for(let i=0;i<this.tweets.length;i++){
      tags = tags.concat([{name:this.tweets[i]['text']}]);
    }
    return tags;
  }

}
