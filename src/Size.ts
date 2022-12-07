export abstract class Size{
}

export class RectSize extends Size{
    w: number;
    h: number;
    constructor(w:number,h:number) {
        super();
        this.w = w;
        this.h = h;
    }
}

export class CircleSize extends Size{
    r: number;
    constructor(r: number) {
        super();
        this.r = r;
    }
}

export class RoundedRectSize extends Size{
    w: number;
    h: number;
    r: number;
    constructor(w: number,h: number,r: number) {
        super();
        this.w = w;
        this.h = h;
        this.r = r;
    }
}