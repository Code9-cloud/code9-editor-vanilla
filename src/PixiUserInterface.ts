import * as PIXI from "pixi.js";
import Grid from "./Grid";
import RegularNode from "./nodes/RegularNode";
import {EXAMPLE_ADD} from "./examples/add";
import {Graph, Node} from "./models/Models";
import UIGraph from "./ui/UIGraph";
import TexturesHandler from './textures/Textures';
import {Container, DisplayObject} from "pixi.js";

export default class PixiUserInterface {
    app:any = null;
    private container: Container<DisplayObject>;
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
        this.container = mainContainer;
        this.app.stage.addChild(this.container);
    }

    async loadAssets(){
        await TexturesHandler.load();
        let test_graph = new Graph(EXAMPLE_ADD);
        let test_regular_graph = new UIGraph(test_graph, this.container);
        // console.log(test_graph);
        // let node = new RegularNode(null,0,0);
        // let nodes = [];
        // for (let node_id of test_graph.nodes.keys()){
        //     let node = new RegularNode(test_graph.nodes.get(node_id), test_graph);
        //     node.init();
        //     node.draw(mainContainer);
        //     nodes.push(node);
        // }
        test_regular_graph.draw();
    }
}