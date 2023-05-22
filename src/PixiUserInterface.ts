import * as PIXI from "pixi.js";
import Grid from "./Grid";

export default class PixiUserInterface {
    app:any = null;
    constructor(document) {
        this.app = new PIXI.Application();
        document.body.style.margin = '0';
        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';
        this.app.renderer.antialias = true;
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        // TODO: Should affect UI values of size too. As this might need to adjust view things like scale.
        window.addEventListener('resize', (e) => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });
        // TODO: load textures before setting view maybe.
        document.body.append(this.app.view);
        console.log("Pixi Initialized");
        var grid = new Grid(this.app, 0, 0);
    }
}