import * as PIXI from 'pixi.js';

export default class UIMainWindow {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private mainwindowWidth: number;
  private mainwindowHeight: number;
  private toolbarWidth: number;
  private toolbarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;


  constructor(x: number, y: number, mainwindowWidth: number, mainwindowHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.mainwindowWidth = mainwindowWidth;
    this.mainwindowHeight = mainwindowHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0xFF337A);
    this.container.on("mousedown", ev => {console.log("Here");}, this)
  }

  draw() {
    // const menuBarHeight = 10;

    const sidebar = new PIXI.Graphics();
    // sidebar.beginFill(0xFFFFFF);
    // sidebar.drawRect(0, menuBarHeight, sidebarWidth, window.innerHeight - menuBarHeight);
    // sidebar.endFill();
    this.border.drawRect(0, 0, this.mainwindowWidth, this.mainwindowHeight);
    this.container.addChild(this.border);

    //this.container.addChild(sidebar);
  }
}
