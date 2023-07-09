import * as PIXI from 'pixi.js';

export default class UIRightSideBar {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private rightsidebarWidth: number;
  private rightsidebarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;


  constructor(x: number, y: number, rightsidebarWidth: number, rightsidebarHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.rightsidebarWidth = rightsidebarWidth;
    this.rightsidebarHeight = rightsidebarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0xFFE333);
  }

  draw() {
    // const menuBarHeight = 10;

    const sidebar = new PIXI.Graphics();
    // sidebar.beginFill(0xFFFFFF);
    // sidebar.drawRect(0, menuBarHeight, sidebarWidth, window.innerHeight - menuBarHeight);
    // sidebar.endFill();
    this.border.drawRect(0, 0, this.rightsidebarWidth, this.rightsidebarHeight);
    this.container.addChild(this.border);

    //this.container.addChild(sidebar);
  }
}
