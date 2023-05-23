import * as PIXI from "pixi.js";
import Grid from "./Grid";
import RegularNode from "./nodes/RegularNode";

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
        let grid = new Grid(this.app, 0, 0);
        let mainContainer = new PIXI.Container();
        this.app.stage.addChild(mainContainer);
        let node = new RegularNode(null,0,0);
        node.init();
        node.draw(mainContainer);
    }
}