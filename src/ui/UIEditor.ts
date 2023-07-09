import * as PIXI from 'pixi.js';
import { Application, ICanvas } from 'pixi.js';
import UIMenuBar, { UIMenuText } from './UIMenuBar';
import UILeftSideBar from './UILeftSideBar';
import UIRightSideBar from './UIRightSideBar';
import UIStatusBar from './UIStatusBar';
import UIToolbar from './UIToolbar';
import UIMainWindow from './UIMainWindow';
import UILeftSideBarHighlighter from './UISidebarHighlighter';
import { MenuItem } from '../models/Models';
import UIActivityBar from './UIActivityBar';

export default class UIEditor {
  private container: PIXI.Container;
  private menu: UIMenuBar;
  private toolbar: UIToolbar;
  private leftsidebar: UILeftSideBar;
  private leftsidebarhighlighter: UILeftSideBarHighlighter;
  private activitybar: UIActivityBar;
  private statusBar: UIStatusBar;
  private rightsidebar: UIRightSideBar;
  private mainwindow: UIMainWindow
  private menuText: UIMenuText;
  private x : number = 0;
  private y : number = 0;
  private menubar_x: number = 0;
  private menubar_y: number = 0;
  private menubar_width: number = window.innerWidth;
  private menubar_height: number = 50;
  private toolbar_x: number = 0;
  private toolbar_y: number = 0;
  private toolbar_width: number = window.innerWidth;
  private toolbar_height: number = 30;
  private statusbar_x: number = 0;
  private statusbar_y: number = 0;
  private statusbar_width: number = window.innerWidth;
  private statusbar_height: number = this.menubar_height;
  private leftsidebar_x: number = 0;
  private leftsidebar_y: number = 0;
  private leftsidebar_width: number = 100;
  private leftsidebar_height: number = window.innerWidth;
  private activitybar_x: number = 0;
  private activitybar_y: number = 0;
  private activitybar_width: number = 30;
  private activitybar_height: number = window.innerWidth;
  private rightsidebar_x: number = 0;
  private rightsidebar_y: number = 0;
  private rightsidebar_width: number = 100;
  private rightsidebar_height: number = window.innerWidth;
  private mainwindow_x: number = 0;
  private mainwindow_y: number = 0;
  private mainwindow_width: number = 0;
  private mainwindow_height: number = window.innerWidth;
  isOverlappingLeftSidebar: boolean = false;
  isAdjustingLeftSidebar: boolean = false;
  isOverlappingLeftSidebarHighlighter: boolean = false;
  private clipper: number = 50;
  private app: Application<ICanvas>;
    orig_mouse_x: number;
    orig_mouse_y: number;
  
  constructor(container: PIXI.Container, app , menu_items: MenuItem[], sidebar_items: MenuItem[]) {
    this.container = container;
    this.app = app;
    this.menu = new UIMenuBar(this.menubar_x, this.menubar_y, this.menubar_width, this.menubar_height, this.container, menu_items);
    // this.menuText = new UIMenuText(this.menubar_x, this.menubar_y, this.container, menu_items);
    this.activitybar_x = this.x;
    this.activitybar_y = this.y + this.toolbar_height;
    this.activitybar_height = window.innerHeight - this.statusbar_height; 
    this.activitybar = new UIActivityBar(this.activitybar_x,this.activitybar_y, this.activitybar_width, this.activitybar_height, this.container);
    this.leftsidebar_x = this.x + this.activitybar_width;
    this.leftsidebar_y = this.y + this.menubar_height;
    this.leftsidebar_height = window.innerHeight - this.menubar_height - this.statusbar_height;
    this.leftsidebar = new UILeftSideBar(this.leftsidebar_x,this.leftsidebar_y, this.leftsidebar_width, this.leftsidebar_height, this.container, sidebar_items);
    this.leftsidebarhighlighter = new UILeftSideBarHighlighter(this.leftsidebar_x + this.leftsidebar_width ,this.leftsidebar_y,this.leftsidebar_height, 20,this.container);
    this.rightsidebar_x = this.x + this.menubar_width-this.rightsidebar_width;
    this.rightsidebar_y = this.y + this.menubar_height;
    this.rightsidebar_height = window.innerHeight - this.menubar_height - this.statusbar_height;
    this.rightsidebar = new UIRightSideBar(this.rightsidebar_x,this.rightsidebar_y, this.rightsidebar_width,this.rightsidebar_height, this.container);
    this.statusbar_x = this.x + this.statusbar_x;
    this.statusbar_y = this.y + window.innerHeight - this.menubar_height;
    this.statusBar = new UIStatusBar(this.statusbar_x ,this.statusbar_y, this.statusbar_width, this.statusbar_height, this.container);
    this.toolbar_x = this.x + this.leftsidebar_width;
    this.toolbar_y = this.y + this.menubar_height;
    this.toolbar_width = window.innerWidth - this.rightsidebar_width - this.leftsidebar_width;
    this.toolbar = new UIToolbar(this.toolbar_x, this.toolbar_y, this.toolbar_width, this.toolbar_height, this.container);
    this.mainwindow_x = this.x + this.leftsidebar_width;
    this.mainwindow_y = this.y + this.toolbar_height + this.menubar_height;
    this.mainwindow_width = window.innerWidth - this.rightsidebar_width - this.leftsidebar_width;
    this.mainwindow_height = window.innerHeight - this.menubar_height-this.toolbar_height - this.statusbar_height;
    this.mainwindow = new UIMainWindow(this.mainwindow_x, this.mainwindow_y, this.mainwindow_width,this.mainwindow_height, this.container);
  }

  draw() {
    this.menu.draw();
    // this.menuText.displayText();
    this.toolbar.draw();
    this.activitybar.draw();
    this.leftsidebar.draw();
    this.rightsidebar.draw();
    this.statusBar.draw();
    this.mainwindow.draw();
    console.log(this.container.width);
    console.log(this.container.height);
  }


  onMouseMove(ev: MouseEvent){
    // Check if already moving the sidebar
    // If yes, then adjust sidebar
    // If not, then check if overlapping with sidebar
    // If overlapping change cursor style
    // Also set overlap to true
    // If overlap sidebar is tru, but mouse moves from boundary, reset overlap and reset cursor style
        if(this.isAdjustingLeftSidebar){
            // TODO: Adjust sidebar width based on mouse movement
            let adjust_width = ev.clientX - this.orig_mouse_x;
            console.log();
            if( adjust_width > -(this.clipper) && adjust_width < this.rightsidebar_x - this.leftsidebar_width -this.clipper){
                this.leftsidebar.adjustWidth = adjust_width;
                this.leftsidebar.clear();
                this.leftsidebar.redraw();

            }
        } else {
            // Check if current curson position overlaps sidebar
            //console.log(Math.abs(ev.clientX - (this.leftsidebar_width + this.x)));
            if (Math.abs(ev.clientX - (this.leftsidebar_width + this.x)) < 2) {
                this.isOverlappingLeftSidebar = true;
                // console.log(ev.clientX);
                // console.log(ev.clientY);
            } else if (this.isOverlappingLeftSidebar == true) {
                this.isOverlappingLeftSidebar = false;
            }
        }
    }

    onMouseOver(ev: MouseEvent){
        // Check if already moving the sidebar
        // If yes, then adjust sidebar
        // If not, then check if overlapping with sidebar
        // If overlapping change cursor style
        // Also set overlap to true
        // If overlap sidebar is tru, but mouse moves from boundary, reset overlap and reset cursor style
        if (Math.abs(ev.clientX - (this.leftsidebar_width + this.x)) < 2) {
            console.log("yayy");
            this.isOverlappingLeftSidebar = true;
        }
        if(this.isOverlappingLeftSidebar){
            this.leftsidebarhighlighter.draw();
        }
        else{
            this.leftsidebarhighlighter.clear();
        }
    }
        
    onMouseDown(ev:MouseEvent) {
        if(this.isOverlappingLeftSidebar) {
            this.isAdjustingLeftSidebar = true;
            this.orig_mouse_x = ev.clientX;
            console.log("Will Adjust Sidebar");
        }
    }

    onMouseUp(ev:MouseEvent) {
        if(this.isAdjustingLeftSidebar){
            this.isAdjustingLeftSidebar = false;
            this.leftsidebar.leftsidebarWidth = this.leftsidebar.leftsidebarWidth + this.leftsidebar.adjustWidth;
            this.leftsidebar_width = this.leftsidebar.leftsidebarWidth;
            this.leftsidebar.adjustWidth = 0;
            this.leftsidebar.clear();
            this.leftsidebar.redraw();
            console.log("Will Stop Adjusting Sidebar");
        }
    }

    onWheel(ev:MouseEvent) {
        console.log("Mouse Wheel")
    }

}