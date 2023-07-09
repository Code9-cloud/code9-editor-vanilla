import * as PIXI from "pixi.js";
import Grid from "./Grid";
import RegularNode from "./nodes/RegularNode";
import {EXAMPLE_ADD} from "./examples/add";
import {Graph, MenuItem, Node} from "./models/Models";
import UIGraph from "./ui/UIGraph";
import UIEditor from "./ui/UIEditor";
import TexturesHandler from './textures/Textures';
import {Container, DisplayObject} from "pixi.js";

export default class PixiUserInterface {
    app:any = null;
    private container: Container<DisplayObject>;
    uieditor: UIEditor;
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
        mainContainer.interactive = true;
        this.container = mainContainer;
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.container);
        this.registerListeners();
    }

    async loadAssets(){
        await TexturesHandler.load();
        let menuItems : MenuItem[] = [];
        menuItems.push(new MenuItem("MenuA", []));
        menuItems.push(new MenuItem("MenuB", []));
        menuItems.push(new MenuItem("MenuC", []));
        let sidebarItems : MenuItem[] = [];
        sidebarItems.push(new MenuItem("SidebarxxxxxxxxxxxxxxxxxxxxxxxA",[]));
        sidebarItems.push(new MenuItem("SidebarB",[]));
        sidebarItems.push(new MenuItem("SidebarC",[]));
        let uieditor = new UIEditor(this.container,this.app, menuItems, sidebarItems);
        this.uieditor = uieditor;
        this.uieditor.draw();

        //  let test_graph = new Graph(EXAMPLE_ADD);
        //  let test_regular_graph = new UIGraph(test_graph, this.container);
        //  let menu = new UIMenu(0,0, this.container);
        //  menu.draw();
        //  let sidebar = new UISideBar(0,0, this.container);
        //  sidebar.draw();
        //  let statusBar = new UISideBar(0,0, this.container);
        //  statusBar.draw();
        //  let rightsidebar = new UIRightSideBar(0,0, this.container);
        //  rightsidebar.draw();
        // let menu = new UIMenu(test_regular_graph);
        // { "text" : "File", "icon" : None, "sub_items" : [MenuItems] }
        // console.log(test_graph);
        // let node = new RegularNode(null,0,0);
        // let nodes = [];
        // for (let node_id of test_graph.nodes.keys()){
        //     let node = new RegularNode(test_graph.nodes.get(node_id), test_graph);
        //     node.init();
        //     node.draw(mainContainer);
        //     nodes.push(node);
        // }
        //  test_regular_graph.draw();
    }

    registerListeners() {
        this.app.stage.on('mousemove', this.onMouseMove, this);
        this.app.stage.on('mousedown', this.onMouseDown, this);
        this.app.stage.on('mouseup', this.onMouseUp, this);
        this.app.stage.on('mousewheel', this.onWheel, this);
        this.app.stage.on('mouseover', this.onMouseOver,this);
    }

    onMouseMove(ev: MouseEvent){
        this.uieditor.onMouseMove(ev);
    }

    onMouseOver(ev: MouseEvent){
        this.uieditor.onMouseOver(ev);
    }

    onMouseDown(ev:MouseEvent) {
        this.uieditor.onMouseDown(ev);
    }

    onMouseUp(ev:MouseEvent) {
        this.uieditor.onMouseUp(ev);
    }

    onWheel(ev:MouseEvent) {
        console.log("Mouse Wheel")
    }

}