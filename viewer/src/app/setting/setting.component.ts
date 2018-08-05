import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  page:number;
  constructor(private location:Location,private image:ImageService) { }

  ngOnInit() {
    let page = Number(localStorage.getItem('page'));
    if(page > 0){
      this.page = page;
    } else {
      this.page = 100;
      localStorage.setItem('page',String(this.page));
    }
  }

  saveSetting(){
    let significantFigure = Number(this.page);
    console.log("save "+significantFigure)
    if(significantFigure > 0){
      localStorage.setItem('page',String(this.page));
      this.image.count = String(this.page);
    } 
  }
  onBack():undefined{
    this.image.deleteTweets()
    this.location.back();
    return;
  }

}
