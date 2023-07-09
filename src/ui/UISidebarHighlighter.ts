import * as PIXI from 'pixi.js';


export default class UILeftSideBarHighlighter {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private leftsidebarhighlighterWidth: number;
  private leftsidebarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;
  mask: PIXI.Graphics;

  constructor(x: number, y: number, leftsidebarhighlighterWidth: number, leftsidebarHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.leftsidebarhighlighterWidth = leftsidebarhighlighterWidth;
    this.leftsidebarHeight = leftsidebarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    // this.border.fillStyle(1, 0x90FF33);
  }

  draw() {
    // const menuBarHeight = 30;
    // const sidebarWidth = window.innerWidth;

    // const sidebar = new PIXI.Graphics();
    // sidebar.beginFill(0xFFFFFF);
    // sidebar.drawRect(0, menuBarHeight, sidebarWidth, window.innerHeight - menuBarHeight);
    // sidebar.endFill();
    this.border.beginFill(0x00FF00); 
    this.border.drawRect(this.x, this.y, this.leftsidebarhighlighterWidth, this.leftsidebarHeight);
    this.border.endFill();
    // this.border.drawRect(0, 0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.container.addChild(this.border);

    //this.container.addChild(sidebar);
  }

  redraw() {
    this.border.beginFill(0xc0c0c0); 
    this.border.drawRect(this.x, this.y, this.leftsidebarhighlighterWidth, this.leftsidebarHeight);
    this.border.endFill();
  }

  clear() {
    this.border.clear();
  }
}