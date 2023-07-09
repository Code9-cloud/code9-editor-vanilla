import * as PIXI from 'pixi.js';
import {MenuItem} from "../models/Models";


export default class UIActivitySideBar {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  private activitybarWidth: number;
  private activitybarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;
  mask: PIXI.Graphics;

  constructor(x: number, y: number, activitybarWidth: number, activitybarHeight: number, parent: PIXI.Container) {
    this.x = x;
    this.y = y;
    this.activitybarWidth = activitybarWidth;
    this.activitybarHeight = activitybarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0xFFE333);
  }

  draw() {
    const sidebar = new PIXI.Graphics();
    sidebar.beginFill(0xFFE333);
    sidebar.drawRect(this.x, this.y, this.activitybarWidth, this.activitybarHeight);
    sidebar.endFill();
    // this.border.drawRect(0, 0, this.activitybarWidth, this.activitybarHeight);
    // this.container.addChild(this.border);
    this.container.addChild(sidebar);
  }

}

