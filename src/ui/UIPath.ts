import {DataType, Path} from "../models/Models";
import * as PIXI from 'pixi.js';

export default class UIPath {
    path: Path;
    container: PIXI.Container;
    start_x: number;
    start_y: number;
    end_x: number;
    end_y: number;
    type: DataType
    line: PIXI.Graphics;
    private linkThickness: number;
    private color: number;
    constructor(path: Path, start_x: number, start_y: number, end_x: number, end_y: number, type: DataType) {
        this.path = path;
        this.start_x = start_x;
        this.start_y = start_y;
        this.end_x = end_x;
        this.end_y = end_y;
        this.type = type;
        this.line = new PIXI.Graphics();
        this.linkThickness = 1;
        this.color = 0x00FF00;
    }
    draw(){
        this.line.lineStyle(this.linkThickness, this.color).moveTo(this.start_x, this.start_y)
            .bezierCurveTo(this.start_x + 40, this.start_y, this.end_x - 40, this.end_y, this.end_x, this.end_y);
    }
    clear() {
        this.line.clear();
    }
    redraw() {
        this.clear();
        this.draw();
    }
}