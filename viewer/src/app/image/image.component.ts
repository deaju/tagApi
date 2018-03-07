import { Component, Input} from '@angular/core';
import { Http, Request, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { ResponseContentType } from '@angular/http/src/enums';
import { RequestOptions } from '@angular/http/src/base_request_options';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent  {
  _tweet:object;
  url:SafeUrl="./assets/image/noimage.png";
  tag:{name:string}={name:'コンニチワ'};
  title:string="";
  caption:string="";
  constructor(private http:Http,private sanitizer: DomSanitizer){

  }
  @Input()
  set tweet(tweet: object){
    this._tweet = tweet;
    this.url = this._tweet['entities']['media'][0]['media_url_https'];
    this.caption = this._tweet['text'];
  }
  getImage(url:string):undefined {
    /*
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions(
      { headers: headers,
      responseType:ResponseContentType.Blob});
    this.http.get(url)
    .map(blob=>{
      let urlCreater = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(urlCreater.createObjectURL(blob));
    })*/
    /*
    this.http.request(new Request({
        method: "Get",
        url: url
      })).subscribe((res:Response)=>{
        let bf = res.arrayBuffer();
        let blob = new Blob([bf], {type: "image/jpeg"});
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      });*/
    return;
}

}
