import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagranking'
})
export class TagrankingPipe implements PipeTransform {

  transform(array: {name:string,count:number}[], range: number): {name:string,count:number}[] {
    array.sort((a: {name:string,count:number}, b: {name:string,count:number}) => {
      if (a.count < b.count) {
        return 1;
      } else if (a.count > b.count) {
        return -1;
      } else {
        return 0;
      }
    });
    return array.slice(0,range);
  }

}
