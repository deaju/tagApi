import { Component, Input} from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { ResponseContentType } from '@angular/http/src/enums';
import { RequestOptions } from '@angular/http/src/base_request_options';
import 'rxjs/add/operator/map';
import { ImageService } from '../image.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent  {
  _tweet:object;
  url:SafeUrl="";
  tags:{name:string}[]=[{name:""}];
  id:string;
  title:string="";
  caption:string="";
  isMulti:boolean;
  isHaveMedia:boolean;
  constructor(private http:Http,private sanitizer: DomSanitizer,private service:ImageService,private auth:AuthService,private router:Router){
  }
  @Input()
  set tweet(tweet: object){
    this._tweet = tweet;
    this.id = this._tweet["id_str"];
    if('media' in this._tweet['entities'] ){
      this.url = this._tweet['entities']['media'][0]['media_url_https'];
      this.isMulti = this._tweet['extended_entities']['media'].length > 1;
      this.tags = this._tweet["tag"];
      this.isHaveMedia=true;
      /*if(this._tweet["tag"] == undefined){
        this.getTag(this._tweet);
      } else {
        this.tags = this._tweet["tag"];
      }*/
    } else {
      this.isHaveMedia=false;
    }
    this.caption = this._tweet['text'].replace(/https:.*/,"");
  }
  getTag(tweet):undefined{
    let data = this.auth.getCurrentToken();
    data['tweet'] = tweet;
    this.http.post("https://damp-ravine-22955.herokuapp.com/twitter/like",data).map((res:Response)=>{
      return res.json();
    })
    .subscribe((tag:{name:string}[])=>{
      let user = this.auth.getCurrentUser();
      this._tweet["tag"] = tag;
      tag.forEach((t)=>user.addTag(t.name));
      this.tags = tag;
    });
    return;
  }
  onTouch():undefined{
    let currentUser = this.auth.getCurrentUser();
    currentUser.scroll = this.getScrollPosition();
    this.router.navigate(["/detail/"+this.id]);
    return;
  }
  getScrollPosition():number {
    let y = document.documentElement.scrollTop || document.body.scrollTop;
    return y;
    }
}
