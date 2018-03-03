import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  providers : [ImageService],
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
 
export class ImageSearchComponent implements OnInit {
  tags: {name:string}[];
  term: string = "";
  constructor(private service:ImageService) { }

  ngOnInit() {
    this.tags = [];//this.service.getImageTagList();
  }
  focus():undefined{
    this.tags = this.service.getImageTagList();
    return;
  }
  blur():undefined{
    setTimeout(()=>{
      if(this.term.length == 0){
        this.tags = [];
      }
      return;
    },300);
    return;
  }
  selectTerm(name:string):undefined{
    this.term = name;
    return;
  }

}