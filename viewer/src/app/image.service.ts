import { Injectable } from '@angular/core';
import { Image } from './image-list/image-list.class';
import { Http, Request, Response, Headers,RequestOptions  } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT } from '../environments/environment';
import { RequestArgs } from '@angular/http/src/interfaces';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service'
import { User } from '../lib/user';

@Injectable()
export class ImageService {
  private count:string;
  tweetsChange:Observable<object[]>;
  private _observer;
  private _tagObserver;

  constructor(private http:Http,private auth:AuthService) { //,private socket:SocketService
    this.count = '200';
    this.tweetsChange = new Observable((observer)=>{
      this._observer = observer;
    });
  }
  
  getNextTweets():undefined{
    let user = this.auth.getCurrentUser();
    let page = user.getMaxPages();
    this.getTweets(page+1);
    return;
  }
  getExistTweets():object[]{
    let user = this.auth.getCurrentUser();
    return user.tweets;
  }
  getTweets(page:number): undefined {
    let user = this.auth.getCurrentUser();
    let url = this.getTweetUrl(page,this.count);
    let data = {
      json:this.auth.getCurrentToken(),
      page:page,
      count:this.count,
      name:user.screenName
    };
    if(user.pages.indexOf(page) >= 0){
      this._observer.next(user.tweets);
    }/* else if(!this.socket.isExistSocket()){
        this.socket.connect();//io.connect('http://' + document.domain + ':' + location.port + '/test');
        this.socket.emit('tweets',data);
        this.socket.on('tweets').subscribe((tweets:object[])=>{
          this.getTags(this,tweets);
        });
        this.socket.on('tag').subscribe((data)=>{
          let user = this.auth.getCurrentUser();
          let id= data['id'];
          let tags = data['tags'];
          let tweet = user.tweets.filter((data)=>{
            return data['id'] === id;
          })
          tweet[0]["tag"] = tags;
        });
    }*/ else {
      //this.socket.emit('tweets',data);
      this.http.post(url,data).map((res:Response)=>{
        return res.json();
      })
      .subscribe((tweets:object[])=>{
        user.pages.push(page);
        user.tweets = user.tweets.concat(tweets);
        user.addTags(tweets);
        this._observer.next(user.tweets);
      });
    }
    return;
  }
  getTags(_imageService,tweets){
    let user = this.auth.getCurrentUser();
    user.pages.push(1);
    user.tweets = user.tweets.concat(tweets);
    user.addTags(tweets);
    this._observer.next(user.tweets);
  }

  getTweetInfo(id:string):object[]{
    let user = this.auth.getCurrentUser();
    return user.tweets.filter((tweet:object)=>{
      return tweet['id_str'] === id;
    });
  }

  getTweetUrl(page:number,count:string):string{
    let user:User = this.auth.getCurrentUser();
    return API_ENDPOINT+'/twitter/'+user.screenName+'/tweet/?page='+page+'&count='+count;
  }

  getImageTagList():{name:string}[]{
    let user = this.auth.getCurrentUser();
    return user.tags;
  }

  deleteTweets():undefined{
    this._observer.next([]);
    return;
  }

}
