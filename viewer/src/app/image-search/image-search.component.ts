import { Component, OnInit,ViewChild, ElementRef, AfterViewInit,DoCheck } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import {TagrankingPipe} from '../tagranking.pipe';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
 
export class ImageSearchComponent implements OnInit,OnChanges{
  tags: {name:string}[];
  term: string = "";
  searchCondition:string;
  isShowList:boolean;
  tweets:object[]=[];
  profUrl:string;
  constructor(private image:ImageService,private router:Router,private location:Location,private route: ActivatedRoute,private auth:AuthService) {
   }

  @ViewChild('searchInput') firstNameElement: ElementRef;
 
 
  ngOnInit() {
    this.searchCondition = this.route.snapshot.params['keyword'];
    if(this.searchCondition !== undefined){
      this.isShowList = false;
      this.term = this.searchCondition;
    } else {
      this.isShowList = true;
    }
    this.tags = this.image.getImageTagList();
    this.firstNameElement.nativeElement.focus();
    this.searchTweet(this.image.getExistTweets());
    this.profUrl = this.auth.getCurrentUser().profUrl;
  }

  ngOnChanges(){
    this.ngOnInit();
  }
  focus():undefined{
    this.tags = this.image.getImageTagList();
    return;
  }
  
  blur():undefined{
    setTimeout(()=>{
      if(this.term == undefined ||  this.term.length == 0){
        this.router.navigate(["/list"]);
      }
      return;
    },300);
    return;
  }
  selectTerm(name:string):undefined{
    this.term = name;
    this.search(name);
    return;
  }
  search(name:string):undefined{
    this.router.navigate(["/search/"+name]);
    this.searchCondition = name;
    this.tweets=[];
    this.searchTweet(this.image.getExistTweets());
    return;
  }
  clear():undefined{
    this.term = "";
    return;
  }
  searchTweet(tweets:object[]):undefined{
    tweets.forEach((tweet)=>{
      if(tweet['text'].indexOf( this.searchCondition) >=0 
      || tweet['user']['name'].indexOf(this.searchCondition) >=0 
      || ( tweet['tag'] != undefined && tweet['tag'].some((tag)=> {
          return tag.name.length >0 && tag.name.indexOf(this.searchCondition)>=0;
        })) ){
        this.tweets.push(tweet);
      }
    });
    return;
  }

}