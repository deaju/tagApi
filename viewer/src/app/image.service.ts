import { Injectable } from '@angular/core';
import { Image } from './image-list/image-list.class';

@Injectable()
export class ImageService {
  imageList: Image[] =[];

  constructor() {
    this.imageList.push(new Image('./assets/image/noimage_small.png',[{name:'bb'},{name:'cc'}]));
    this.imageList.push(new Image('./assets/image/noimage_small.png',[{name:'shdjad'},{name:'コンニチワ'}]));
   }

  getImageList(): Image[]{
    return this.imageList;
  }
  getImageTagList():{name:string}[]{
    let tags = [];
    for(let i=0;i<this.imageList.length;i++){
      tags = tags.concat(this.imageList[i].getTag())
    }
    return tags;
  }
}
