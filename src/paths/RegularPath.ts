import UIGraph from "../ui/UIGraph";

export default class RegularPath {
    start_x: number;
    start_y: number;
    end_x: number;
    end_y: number;
    start_node: string;
    start_pin: string;
    end_node: string;
    end_pin: string;
    parent: UIGraph;
    constructor(obj, graph) {
        this.parent = graph;
        this.start_node = obj.start_node;
        this.start_pin = obj.start_pin;
        this.end_node = obj.end_node;
        this.end_pin = obj.end_pin;
    }
}