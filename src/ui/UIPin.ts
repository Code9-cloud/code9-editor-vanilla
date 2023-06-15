import {Pin} from "../models/Models";
import * as PIXI from 'pixi.js';
// import {TEXTURES} from "../resources";
import {CONFIG} from "../config/config";
import TextureHandler from '../textures/Textures';

export default class UIPin {
    pin: Pin;
    container: PIXI.Container;
    x: number;
    y: number;
    height: number = 10;
    width: number = 10;
    private pinSprite: PIXI.Sprite;
    private pinText: PIXI.Text;
    private border: PIXI.Graphics;
    constructor(pin: Pin, x: number, y: number) {
        this.pin = pin;
        this.container = new PIXI.Container();
        this.x = x;
        this.y = y;
        this.container.x = this.x;
        this.container.y = this.y;
        this.pinSprite = PIXI.Sprite.from(this.getPinSprite());
        this.pinText = new PIXI.Text(this.pin.name, new PIXI.TextStyle({
            fontSize: 12,
            fill: ['#ffffff']
        }));
        this.width = this.pinSprite.width + CONFIG.CELL_SIZE + this.pinText.width + CONFIG.CELL_SIZE * (3/4);
        if (this.pin.is_output){
            this.x -= this.width;
        }
        this.height = CONFIG.CELL_SIZE * (1.5);
        this.container.width = this.width;
        this.container.height = this.height;

        this.container.eventMode = 'static';
        this.container.on('mousedown', (ev) => {
            // console.log("Clicked");
        });
        // this.border = new PIXI.Graphics();
        // this.border.lineStyle(1, 0xFFFFFF);
    }
    getPinSprite(){
        return this.pin.is_connected ? TextureHandler.pinConnected : TextureHandler.pinDisconnected;
    }
    draw(){
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.addChild(this.pinSprite);
        this.container.addChild(this.pinText);
        this.pinText.anchor.set(0, 0);
        if (this.pin.is_output) {
            this.pinText.anchor.set(1, 0);
            this.pinText.x = this.pinSprite.x - CONFIG.CELL_SIZE * (3 / 4);
        }
        this.pinText.y = this.pinSprite.y;
        // this.border.drawRect(0, 0, this.width, this.height);
        // this.container.addChild(this.border);
    }
}