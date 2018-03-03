import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image-list/image-list.class';

@Component({
  providers : [ImageService],
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList:Image[];
  constructor(private service:ImageService) { }

  ngOnInit() {
    this.imageList = this.service.getImageList();
  }

}
