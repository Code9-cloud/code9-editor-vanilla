const DEFAULT_WIDTH : number = 10;
const DEFAULT_HEIGHT : number = 10;

export enum NodeType {
    START = "START",
    INPUT = "INPUT",
    VAR = "VAR",
    SET = "SET",
    //REVISIT: Collapse operators into Single Type
    ADD = "ADD",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV",
    NOT = "NOT",
    CONCAT = "CONCAT",
    PRINT = "PRINT",
    RETURN = "RETURN",
    BRANCH = "BRANCH",
    // PATTERN Match to be added
    LOOP = "LOOP",
    SEQUENCE = "SEQUENCE",
    FUNCALL = "FUNCALL",
}

export class Node {
    id: string;
    type: NodeType;
    name: string;
    pos_x: number;
    pos_y: number;
    width: number;
    height: number;
    // ADD exec ins & outs
    inputs: Pin[];
    outputs: Pin[];
    pin_map: Map<string,Pin>;
    parent: Graph;

    constructor(obj, graph) {
        this.parent = graph;
        this.id = obj.id;
        this.type = obj.type;
        this.name = obj.name;
        this.pos_x = 0;
        this.pos_x = 0;
        this.width = DEFAULT_WIDTH;
        this.height = DEFAULT_HEIGHT;
        if (obj.pos_x){
            this.pos_x = obj.pos_x;
        }
        if (obj.pos_y){
            this.pos_y = obj.pos_y;
        }
        if (obj.width){
            this.width = obj.width;
        }
        if (obj.height){
            this.height = obj.height;
        }
        this.inputs = [];
        this.outputs = [];
        this.pin_map = new Map<string, Pin>();
        let pin: any;
        for (pin of obj.inputs) {
            let curr_pin = new Pin(pin);
            this.inputs.push(curr_pin);
            this.pin_map.set(pin.id, curr_pin);
        }
        for (pin of obj.outputs) {
            let curr_pin = new Pin(pin);
            curr_pin.is_output = true;
            this.outputs.push(curr_pin);
            this.pin_map.set(pin.id, curr_pin);
        }
    }

}

export enum DataType {
    I64 = "I64",
    BOOL = "BOOL",
    STRING = "STRING",
    STRUCT = "STRUCT",
    // ARRAY
}

export class Pin {
    id: string;
    name: string;
    type: DataType;
    //REVISIT: Check if required
    is_output: boolean;
    is_exec: boolean;
    is_connected: boolean = false;
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.type = obj.type;
        this.is_output = obj.is_output;
        this.is_exec = obj.is_exec;
    }
}

export class Path {
    in_node: string;
    in_pin: string;
    out_node: string;
    out_pin: string;
    type: DataType;
    is_exec: boolean = false;
    parent: Graph;

    constructor(obj, graph, is_exec = false, type : DataType = null) {
        this.parent = graph;
        this.in_node = obj.in_node;
        this.in_pin = obj.start;
        this.out_node = obj.out_node;
        this.out_pin = obj.end;
        if (type) {
            this.type = type;
        }
        if (is_exec) {
            this.is_exec = is_exec;
        }
    }
}

export class Graph {
    name: string;
    nodes: Map<string, Node>;
    paths: Path[];
    constructor(obj) {
        this.name = obj.name;
        this.nodes = new Map<string, Node>();
        this.paths = []
        let node: any;
        for (node of obj.nodes) {
            this.nodes.set(node.id,new Node(node, this));
        }
        let path: any;
        for (path of obj.paths) {
            let in_pin = this.nodes.get(path.in_node).pin_map.get(path.start);
            this.paths.push(new Path(path, this, in_pin.is_exec, in_pin.type));
            this.nodes.get(path.in_node).pin_map.get(path.start).is_connected = true;
            this.nodes.get(path.out_node).pin_map.get(path.end).is_connected = true;
        }
    }x
}