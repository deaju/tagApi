import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image-list/image-list.class';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  tweets:object[];
  constructor(private service:ImageService) { }

  ngOnInit() {
    this.tweets = [];
    this.service.getTweet().subscribe((data)=>{
      this.tweets = data;
    });
  }

}
