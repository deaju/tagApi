import { Http, Request, Response, Headers } from '@angular/http';

export class Image {
    url:string='';
    tag:{name:string}[];
    constructor(private http:Http,url: string, tag: {name:string}[]) {
       this.getImage(url);
        this.tag = tag;
    }
    getImage(url:string):undefined {
        this.http.request(new Request({
            method: "Get",
            url: url
          })).subscribe((res:Response)=>{
            let bf = res.arrayBuffer();
            let blob = new Blob([bf], {type: "application/octet-binary"});
            this.url = window.URL.createObjectURL(blob);
          });
        return;
    }
    getTag():{name:string}[]{
        return this.tag;
    }
}