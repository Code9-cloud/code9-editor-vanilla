import * as PIXI from 'pixi.js';

export default class UIStatusBar{
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private statusbarWidth : number;
  private statusbarHeight : number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;

  constructor(x: number, y: number, statusbarWidth: number, statusbarHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.statusbarWidth = statusbarWidth;
    this.statusbarHeight = statusbarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0x3339FF);
  }

  draw() {
    // const menuBarHeight = window.innerWidth;
    // const sidebarWidth = 30;

    const sidebar = new PIXI.Graphics();
    sidebar.beginFill(0x1DA4A9);
    sidebar.drawRect(0,0, this.statusbarWidth, this.statusbarHeight);
    sidebar.endFill();
    // this.border.drawRect(0, 0, this.statusbarWidth, this.statusbarHeight);
    // console.log("statusbar height and statusbar width", this.statusbarHeight, this.statusbarWidth);
    // this.container.addChild(this.border);

    this.container.addChild(sidebar);
  }
}
