import { API_ENDPOINT } from '../environments/environment';
import { Http,Response } from '@angular/http';

export class User {
    token:string;
    tokenSecret:string;
    screenName:string;
    profUrl:string;
    current:boolean;
    tweets:object[];
    pages:number[];
    tags:{name:string,count:number}[];
    scroll:number;
    constructor(storageUser:any,private http:Http){
        this.token = storageUser.oauth_token;
        this.tokenSecret = storageUser.oauth_token_secret;
        this.screenName = storageUser.screen_name;
        this.current = storageUser.current;
        this.getProfImage();
        this.tweets = [];
        this.pages = [];
        this.tags = [];
        this.scroll = 0;
    }
    private getProfImage(){
        if(this.profUrl==null){
            let data = {
              access_token:this.token,
              access_token_secret:this.tokenSecret
            };
            let url = this.getProfUrl(this.screenName);
            this.http.post(url,data).map((res:Response)=>{
              return res.json();
            })
            .subscribe((profile)=>{
              this.profUrl = profile['profile_image_url_https'];
            });
        }
    }
    addTags(tweets:object[]):undefined{
        for(let i=0;i<tweets.length;i++){
            this.addTag(tweets[i]['text'].replace(/https:.*/,""));
        }
        return;
    }
    addTag(name:string):undefined{
        if(name==""){
            return;
        } else if(this.tags.some((tag)=> tag.name == name)){
            this.tags.map((tag)=>{
                if(tag.name == name){
                    tag.count++;
                }
                return tag;
            });
        } else {
            this.tags.push({name:name,count:1});
        }
        return;
    }
    getProfUrl(screen_name:string):string{
        return API_ENDPOINT+'/twitter/'+screen_name;
      }
    isLogin():boolean{
        return this.token !== null && this.tokenSecret !== null  && this.screenName !== null;
    }
    isCurrent():boolean{
        return this.current;
    }
    changeCurrent():undefined{
        this.current = !this.current;
        return;
    }
    toSaveObject():object{
        return {current:this.current,oauth_token:this.token,oauth_token_secret:this.tokenSecret,screen_name:this.screenName};
    }
    getMaxPages():number{
        return this.pages.reduce((max,currentValue)=> max > currentValue?max:currentValue);
    }
}