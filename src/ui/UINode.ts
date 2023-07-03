import * as PIXI from 'pixi.js';
// import * as PIXIEvent from '@pixi/events';
import {Node, Pin} from "../models/Models";
import UIPin from "./UIPin";
import TexturesHandler from "../textures/Textures";
import UIGraph from "./UIGraph";
import {CONFIG} from "../config/config";
export default class UINode {
    node: Node;
    x: number;
    y: number;
    width: number;
    height: number;
    minWidthCells: number = 8;
    minHeightCells: number = 3;
    container: PIXI.Container;
    node_container: PIXI.Container;
    inputs: UIPin[] = [];
    outputs: UIPin[] = [];
    ui_pin_map: Map<string, UIPin> = new Map<string, UIPin>();
    dragging: boolean = false;
    private body: PIXI.NineSlicePlane;
    move_x: number = 0;
    move_y: number = 0;
    move_offset_x: number = 0;
    move_offset_y: number = 0;
    private parent: UIGraph;
    constructor(node: Node, parent: UIGraph) {
        this.parent = parent;
        this.container = new PIXI.Container();
        this.node_container = new PIXI.Container();
        this.container.addChild(this.node_container);
        this.node = node;
        this.x = this.node.pos_x;
        this.y = this.node.pos_y;
        this.initBody();
        this.width = this.minWidthCells * CONFIG.CELL_SIZE;
        this.height = this.minHeightCells * CONFIG.CELL_SIZE;
        let pin: Pin;
        let pinRowsCount = Math.max(node.inputs.length, node.outputs.length);
        let rowWidths = [];
        let i = 0;
        while (i < pinRowsCount) {
            rowWidths.push(0);
            i += 1;
        }
        i = 0;
        for (pin of node.inputs){
            i += 1;
            let curr_pin = new UIPin(pin, 0,i * 10);
            this.inputs.push(curr_pin);
            this.ui_pin_map.set(pin.id, curr_pin);
            this.container.addChild(curr_pin.container);
            rowWidths[i] = curr_pin.width;
        }
        i = 0;
        let maxWidth = this.width;
        for (pin of node.outputs){
            i += 1;
            let curr_pin = new UIPin(pin, this.width,i * 10);
            this.outputs.push(curr_pin);
            this.ui_pin_map.set(pin.id, curr_pin);
            this.container.addChild(curr_pin.container);
            rowWidths[i] += curr_pin.width;
            if (rowWidths[i] > maxWidth) {
                maxWidth = rowWidths[i];
            }
        }
        this.width = maxWidth;
        this.height = Math.max(this.height, pinRowsCount * CONFIG.CELL_SIZE * (1.5) + CONFIG.CELL_SIZE);
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.width = this.width;
        this.container.height = this.height;
        this.node_container.x = 0;
        this.node_container.y = 0;
        this.node_container.width = this.width;
        this.node_container.height = this.height;
        this.body.width = this.width;
        this.body.height = this.height;
        // Register Event Listeners
        this.node_container.eventMode = 'static';
        this.node_container.on('click', (ev) => {
            this.onHover();
        });
        this.node_container.on('mousedown', (ev) => {
            this.onMouseDown(ev);
        });
        this.node_container.on('mouseup', (ev) => {
            this.onMouseUp(ev);
        });
        this.node_container.on('mousemove', (ev) => {
            this.onMouseMove(ev);
        });
        this.node_container.on('mouseleave', (ev) => {
            this.onMouseLeave(ev);
        })

    }
    initBody() {
        this.body = new PIXI.NineSlicePlane(TexturesHandler.bodyTexture, 14, 14, 14, 14);
        this.body.width = this.width;
        this.body.height = this.height;
        this.body.x = 0;
        this.body.y = 0;
    }
    draw() {
        this.node_container.addChild(this.body);
        for (let curr_pin of this.inputs){
            curr_pin.draw();
        }
        for (let curr_pin of this.outputs){
            curr_pin.draw();
        }
    }
    getInputPinIdx(pin_id: string) {
        let idx = 0;
        for (let pin of this.inputs){
            if (pin.pin.id == pin_id) {
                return [idx, pin.x, pin.y, pin.height, pin.width];
            }
            idx += 1;
        }
        return [-1, 0, 0, 0, 0];
    }
    getOutputPinIdx(pin_id: string) {
        let idx = 0;
        for (let pin of this.outputs){
            if (pin.pin.id == pin_id) {
                return [idx, pin.x, pin.y, pin.height, pin.width];
            }
            idx += 1;
        }
        return [-1, 0, 0, 0, 0];
    }
    onHover() {
        // console.log('Clicked');
    }
    onMouseMove(ev: PIXI.FederatedPointerEvent) {
        if(this.dragging){
            this.move_offset_x = ev.x - this.move_x;
            this.move_offset_y = ev.y - this.move_y;
            this.container.x = this.x + this.move_offset_x;
            this.container.y = this.y + this.move_offset_y;
            this.updatePaths();
        }
    }
    onMouseDown(ev: PIXI.FederatedPointerEvent) {
        this.dragging = true;
        this.move_x = ev.x;
        this.move_y = ev.y;
    }
    onMouseUp(ev) {
        this.dragging = false;
        this.x = this.x + this.move_offset_x;
        this.y = this.y + this.move_offset_y;
        this.container.x = this.x;
        this.container.y = this.y;
        this.move_offset_x = 0;
        this.move_offset_y = 0;
        this.move_x = 0;
        this.move_y = 0;
        this.updatePaths();
    }

    private onMouseLeave(ev) {
        if(this.dragging) {
            this.dragging = false;
            this.x = this.x + this.move_offset_x;
            this.y = this.y + this.move_offset_y;
            this.container.x = this.x;
            this.container.y = this.y;
            this.move_offset_x = 0;
            this.move_offset_y = 0;
            this.move_x = 0;
            this.move_y = 0;
            this.updatePaths();
        }
    }
    private updatePaths() {
        this.parent.updatePathsOfNode(this.node.id);
    }
}