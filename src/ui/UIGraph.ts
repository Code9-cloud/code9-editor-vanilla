import * as PIXI from 'pixi.js';
import {Graph, Path} from "../models/Models";
import UINode from "./UINode";
import UIPath from "./UIPath";

export default class UIGraph {
    private parent_container: PIXI.Container;
    private container: PIXI.Container;
    private offset_x: number;
    private offset_y: number;
    private scale: number;
    private graph: Graph;
    nodes: Map<string,UINode> = new Map<string, UINode>();
    paths: UIPath[] = [];
    constructor(graph: Graph, parent_container: PIXI.Container) {
        this.parent_container = parent_container;
        this.container = new PIXI.Container();
        this.parent_container.addChild(this.container);
        this.graph = graph;
        let node_id: string;
        for (node_id of this.graph.nodes.keys()) {
            let curr_node = this.graph.nodes.get(node_id);
            let ui_node = new UINode(curr_node, this);
            this.nodes.set(node_id, ui_node);
            this.container.addChild(ui_node.container);
        }
        let path: Path;
        for (path of this.graph.paths) {
            let start_node = this.nodes.get(path.in_node);
            let end_node = this.nodes.get(path.out_node);
            let start_offsets = start_node.getOutputPinIdx(path.in_pin);
            let end_offsets = end_node.getInputPinIdx(path.out_pin);
            let start_x = start_node.x + start_node.width;
            let start_y = start_node.y + start_offsets[2] + (start_offsets[3] / 2);
            let end_x = end_node.x;
            let end_y = end_node.y + end_offsets[2] + (end_offsets[3] / 2);
            let ui_path = new UIPath(path, start_x, start_y, end_x, end_y, null);
            this.paths.push(ui_path);
            this.container.addChild(ui_path.line);
        }
        this.offset_x = 0;
        this.offset_y = 0;
        this.scale = 1.0;
    }
    drawNodes() {
        let node_id: string;
        for (node_id of this.nodes.keys()){
            this.nodes.get(node_id).draw();
        }
    }
    drawPaths() {
        for (let path of this.paths) {
            path.draw();
        }
    }
    draw(){
        this.container.x = this.offset_x;
        this.container.y = this.offset_y;
        this.container.width = 1920;
        this.container.height = 1080;
        this.drawNodes();
        this.drawPaths();
    }
    updatePathsOfNode(node_id : string){
        // Pass Dont lookup
        let node = this.nodes.get(node_id);
        for (let path of this.paths) {
            if (path.path.in_node == node_id){
                let start_offsets = node.getOutputPinIdx(path.path.in_pin);
                let start_x = node.x + node.move_offset_x + node.width;
                let start_y = node.y + node.move_offset_y + start_offsets[2] + (start_offsets[3] / 2);
                path.start_x = start_x;
                path.start_y = start_y;
                path.redraw();
            }
            if (path.path.out_node == node_id){
                let end_offsets = node.getInputPinIdx(path.path.out_pin);
                let end_x = node.x + node.move_offset_x;
                let end_y = node.y + node.move_offset_y + end_offsets[2] + (end_offsets[3] / 2);
                path.end_x = end_x;
                path.end_y = end_y;
                path.redraw();
            }
        }
    }
}