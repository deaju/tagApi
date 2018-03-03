export class Image {
    url:string;
    tag:{name:string}[];
    constructor(url: string, tag: {name:string}[]) {
        this.url = url;
        this.tag = tag;
    }
    getTag():{name:string}[]{
        return this.tag;
    }
}