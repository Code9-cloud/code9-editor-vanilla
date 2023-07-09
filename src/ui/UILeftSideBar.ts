import * as PIXI from 'pixi.js';
import {MenuItem} from "../models/Models";


export default class UILeftSideBar {
  private container: PIXI.Container;
  private x: number;
  private y: number;
  leftsidebarWidth: number;
  adjustWidth: number = 0;
  private sidebarItem: MenuItem[];
  private leftsidebarHeight: number;
  private parent: PIXI.Container;
  private border: PIXI.Graphics;
  private uiSidebarItems : UISidebarText[] = [];
  mask: PIXI.Graphics;

  constructor(x: number, y: number, leftsidebarWidth: number, leftsidebarHeight: number, parent: PIXI.Container,sidebarItem: MenuItem[]) {
    this.x = x;
    this.y = y;
    this.leftsidebarWidth = leftsidebarWidth;
    this.leftsidebarHeight = leftsidebarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    let item:MenuItem;
    this.sidebarItem = sidebarItem;
    let item_pos_y = 0;
    this.mask = new PIXI.Graphics();
    for (item of this.sidebarItem) {
      let currItem = new UISidebarText(0, item_pos_y, this.container, item.text)
      item_pos_y += currItem.height + 10;
      this.uiSidebarItems.push(currItem);
    }
    // this.border.fillStyle(1, 0x90FF33);
  }

  draw() {
    // const menuBarHeight = 30;
    // const sidebarWidth = window.innerWidth;

    // const sidebar = new PIXI.Graphics();
    // sidebar.beginFill(0xFFFFFF);
    // sidebar.drawRect(0, menuBarHeight, sidebarWidth, window.innerHeight - menuBarHeight);
    // sidebar.endFill();
    this.border.beginFill(0xc0c0c0); 
    this.border.drawRect(0, 0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.border.endFill();
    // this.border.drawRect(0, 0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.container.addChild(this.border);
    for (let sideMenuItem of this.uiSidebarItems) {
      sideMenuItem.draw();
    }
    this.mask.beginFill(0xFFFFFF);
    this.mask.drawRect(0,0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.mask.endFill();
    this.container.mask = this.mask;

    //this.container.addChild(sidebar);
  }

  redraw() {
    this.border.beginFill(0xc0c0c0); 
    this.border.drawRect(0, 0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.border.endFill();
    this.mask.beginFill(0xffffff); 
    this.mask.drawRect(0, 0, this.leftsidebarWidth + this.adjustWidth, this.leftsidebarHeight);
    this.mask.endFill();

  }

  clear() {
    this.border.clear();
    this.mask.clear();
  }
}

export class UISidebarText {
  // private container: PIXI.Container;
  private textDisplay: PIXI.Text;
  private x : number;
  private y : number;
  height: number = 10;
  width: number = 10;
  isHovered : boolean = false;
  private sidebarText: string;
  private box: PIXI.Graphics;
  private parent: PIXI.Container;
  mask: PIXI.Graphics;
  constructor(x: number, y: number, parent: PIXI.Container, sidebarText: string) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.sidebarText = sidebarText;
    this.textDisplay = new PIXI.Text(this.sidebarText, new PIXI.TextStyle({
      fontSize: 12,
      fill: ['#ff0000']
    }))

   // this.textDisplay.interactive = true; // Enable interactivity
   // this.textDisplay.on('mouseover', this.onMouseOver, this);
   // this.textDisplay.on('mouseout', this.onMouseOut, this);
 
    this.box = new PIXI.Graphics();
    this.box.visible = false; // Hide the box initially
    this.parent.addChild(this.box);


    // this.container = new PIXI.Container();
    // this.container.x = x;
    // this.container.y = y;
    this.textDisplay.x = this.x;
    this.textDisplay.y = this.y;
    this.width = this.textDisplay.width;
    this.height = this.textDisplay.height;
    // this.parent.addChild(this.textDisplay);
    // this.createMenuBar();
  }

  draw(){
    this.parent.addChild(this.textDisplay);
    this.textDisplay.anchor.set(0, 0);
    this.textDisplay.x = this.x;
    this.textDisplay.y = this.y;
  }

  /*

  private onMouseOver() {
    this.isHovered = true;
    this.textDisplay.style = new PIXI.TextStyle({
      fontSize: 12,
      fill: ['#ffff00']
    })
    // this.box.clear();
    // this.box.lineStyle(2, 0xffffff);
    // this.box.drawRect(this.x, this.y, this.textDisplay.width, this.textDisplay.height);
    // this.box.visible = true;
  }

  private onMouseOut() {
    this.isHovered = false;
    this.textDisplay.style = new PIXI.TextStyle({
      fontSize: 12,
      fill: ['#ffffff']
    })
    // this.box.visible = false;
  }
    */
}

