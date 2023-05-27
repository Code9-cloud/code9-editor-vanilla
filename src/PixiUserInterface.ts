import * as PIXI from "pixi.js";
import Grid from "./Grid";
import RegularNode from "./nodes/RegularNode";
import {EXAMPLE_ADD} from "./examples/add";
import {Graph, Node} from "./models/Models";

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
        let test_graph = new Graph(EXAMPLE_ADD);
        // console.log(test_graph);
        // let node = new RegularNode(null,0,0);
        let nodes = [];
        let curr_node : Node;
        for (curr_node of test_graph.nodes){
            let node = new RegularNode(curr_node);
            node.init();
            node.draw(mainContainer);
            nodes.push(node);
        }
    }
}