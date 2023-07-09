import * as PIXI from 'pixi.js';
import {MenuItem} from "../models/Models";
import {CONFIG} from "../config/config";

// interface MenuItem {
//     text: string;
//     icon ? : string | null;
//     sub_items ? : MenuItem[] | null;
//   }

export default class UIMenuBar {
  private container: PIXI.Container;
  private x : number;
  private y : number;
  private menuBarWidth : number;
  private menuBarHeight : number;
  private menuItems: MenuItem[];
  private uiMenuItems : UIMenuText[] = [];
  private parent: PIXI.Container;
  private border: PIXI.Graphics;
  private pinText: PIXI.Text;
  constructor(x: number, y: number, menuBarWidth: number, menuBarHeight: number, parent: PIXI.Container, menuItems: MenuItem[]) {
    this.x = x;
    this.y = y;
    this.menuBarWidth = menuBarWidth;
    this.menuBarHeight = menuBarHeight;
    this.parent = parent;
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = y;
    this.parent.addChild(this.container);
    this.border = new PIXI.Graphics();
    this.border.lineStyle(1, 0xFF33FC);
    this.menuItems = menuItems;
    let item_pos_x = 0;
    let item:MenuItem;
    for (item of this.menuItems) {
      let currItem = new UIMenuText(item_pos_x, this.menuBarHeight / 2, this.container, item.text)
      item_pos_x += currItem.width + 10;
      this.uiMenuItems.push(currItem);
    }
    // this.createMenuBar();
  }

//   createMenuBar() {
//     const menuBarWidth = 400;
//     const menuBarHeight = 30;

//     const menuBar = new PIXI.Graphics();
//     menuBar.beginFill(0x336699);
//     menuBar.drawRect(0, 0, menuBarWidth, menuBarHeight);
//     menuBar.endFill();
//     this.addChild(menuBar);
//   }
    draw(){
        // const menuBarWidth = window.innerWidth;;
        // const menuBarHeight = 30;

        const menuBar = new PIXI.Graphics();
        // menuBar.beginFill(0xFFFFFF);
        // menuBar.drawRect(0, 0, menuBarWidth, menuBarHeight);
        // menuBar.endFill();
        menuBar.beginFill(0x808080); 
        menuBar.drawRect(0, 0, this.menuBarWidth, this.menuBarHeight);
        menuBar.endFill();

        // this.border.drawRect(0, 0, this.menuBarWidth, this.menuBarHeight);
        // this.container.addChild(this.border);
        
        this.container.addChild(menuBar);
        for (let item of this.uiMenuItems) {
          item.draw();
          //menuBar.addChild(item);
        }
    }
}



export class UIMenuText {
  // private container: PIXI.Container;
  private textDisplay: PIXI.Text;
  private x : number;
  private y : number;
  height: number = 10;
  width: number = 10;
  isHovered : boolean = false;
  private menuText: string;
  private box: PIXI.Graphics;
  private parent: PIXI.Container;
  constructor(x: number, y: number, parent: PIXI.Container, menutext: string) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.menuText = menutext;
    this.textDisplay = new PIXI.Text(this.menuText, new PIXI.TextStyle({
      fontSize: 12,
      fill: ['#ffffff']
    }))

    this.textDisplay.interactive = true; // Enable interactivity
    this.textDisplay.on('mouseover', this.onMouseOver, this);
    this.textDisplay.on('mouseout', this.onMouseOut, this);

    this.box = new PIXI.Graphics();
    this.box.visible = false; // Hide the box initially
    this.parent.addChild(this.box);


    // this.container = new PIXI.Container();
    // this.container.x = x;
    // this.container.y = y;
    this.textDisplay.x = this.x;
    this.textDisplay.y = this.y;
    this.width = this.textDisplay.width;
    // this.parent.addChild(this.textDisplay);
    // this.createMenuBar();
  }

  draw(){
    this.parent.addChild(this.textDisplay);
    this.textDisplay.anchor.set(0, 0.5);
    this.textDisplay.x = this.x;
    this.textDisplay.y = this.y;
  }

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
    
}
