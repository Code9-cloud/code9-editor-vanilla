import * as PIXI from 'pixi.js';

export default class UIToolbar {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private toolbarWidth: number;
  private toolbarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;


  constructor(x: number, y: number, toolbarWidth: number, toolbarHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.toolbarWidth = toolbarWidth;
    this.toolbarHeight = toolbarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0xFF5833);
  }

  draw() {
    // const menuBarHeight = 10;

    const sidebar = new PIXI.Graphics();
    // sidebar.beginFill(0xFFFFFF);
    // sidebar.drawRect(0, menuBarHeight, sidebarWidth, window.innerHeight - menuBarHeight);
    // sidebar.endFill();
    this.border.drawRect(0, 0, this.toolbarWidth, this.toolbarHeight);
    this.container.addChild(this.border);

    //this.container.addChild(sidebar);
  }
}
