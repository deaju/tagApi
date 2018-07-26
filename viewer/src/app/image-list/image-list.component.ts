import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image-list/image-list.class';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit,OnChanges {
  isShow:boolean;
  @Input() searchCondition:string;
  @Input() tweets:object[];
  constructor() { }

  ngOnChanges(){
    this.ngOnInit();
  }
  ngOnInit() {

  }

  
}
