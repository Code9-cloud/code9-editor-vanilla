import * as PIXI from "pixi.js";

export default class PixiUserInterface {
    app:any = null;
    constructor(document) {
        this.app = new PIXI.Application();
        document.body.append(this.app.view);
        console.log("Pixi Initialized");
    }
}