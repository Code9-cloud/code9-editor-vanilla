import * as PIXI from 'pixi.js';

export default class UIToolKit {
  private container: PIXI.Container;
  private x : number;
  private y : number;
  private parent: PIXI.Container;
  constructor(x: number, y: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
  }
    draw(){
        const menuBarWidth = window.innerWidth;;
        const menuBarHeight = 30;

        const menuBar = new PIXI.Graphics();
        menuBar.beginFill(0x33FFEC);
        menuBar.drawRect(0, 0, menuBarWidth, menuBarHeight);
        menuBar.endFill();

        this.container.addChild(menuBar);
    }
}
