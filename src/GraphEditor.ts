import {GraphMouseDownEvent, GraphMouseMoveEvent, GraphMouseUpEvent, GraphWheelEvent} from "./Event";

class GraphPath {
    sn: Number;
    ss: Number;
    en: Number;
    es: Number;
    constructor(start_node, start_slot, end_node, end_slot) {
        this.sn = start_node;
        this.ss = start_slot;
        this.en = end_node;
        this.es = end_slot;
    }
}

class GraphSlot {
    // Slot Type
    // 0 == Node space Slots
    // 1 == Editor space Slots
    x: Number;
    y: Number;
    r: Number;
    node: Number;
    st: Number;
    color: string;
    constructor(pos_x,pos_y,radius, fill_color = "blue", node_id = -1) {
        this.x = pos_x;
        this.y = pos_y;
        this.r = radius;
        if(node_id >= 0) {
            this.node = node_id;
            this.st = 0;
        } else {
            this.st = 1;
        }
        this.color = fill_color;
        // this.highlighted = false;
    }
}

class GraphNode{
    slots = {};
    slot_ids = [];
    last_slot_id = -1;
    x: Number;
    y: Number;
    w: Number;
    h: Number;
    // TODO: Ensure invariant that size is enough for slots.
    constructor(pos_x,pos_y,size_x,size_y, num_in_slots = 0, num_out_slots = 0){
        let slot_radius = 10;
        if(num_in_slots > 0){
            for (let i = 0; i < num_in_slots; i++){
                this.last_slot_id += 1;
                this.slots[this.last_slot_id] = new GraphSlot(0,i * slot_radius * 2, slot_radius);
                this.slot_ids.push(this.last_slot_id);
            }
        }
        if(num_out_slots > 0){
            for (let i = 0; i < num_out_slots; i++){
                this.last_slot_id += 1;
                this.slots[this.last_slot_id] = new GraphSlot(size_x - (2 * slot_radius),i * slot_radius * 2, slot_radius);
                this.slot_ids.push(this.last_slot_id);
            }
        }
        this.x = pos_x;
        this.y = pos_y;
        this.w = size_x
        this.h = size_y;
        // this.highlighted = false;
        // console.log(this);
    }
}

export default class GraphEditor {
    MIN_ZOOM = 1;
    MAX_ZOOM = 16;
    BASE_GRID_STEP = 20;
    IS_GRID_ENABLED = true;
    interval = 1;
    redrawing = false;
    bg_color = 'rgb(38,38,38)';
    count = 0;
    graph_offset_x = 0;
    graph_offset_y = 0;
    zoom_scale = 1;
    nodes = {};
    node_ids = [];
    paths = {};
    path_ids = [];
    last_path_id = -1;
    last_node_id = -1;
    current_highlighted = -1;
    current_highlighted_slot = -1;
    target_highlighted = -1;
    target_highlighted_slot = -1;
    currently_dragging = -1;
    dragging_graph = false;
    drag_offset_x = 0;
    drag_offset_y = 0;
    // redraws = {};
    // global_redraw = null;
    is_running = false;
    is_generating_path = false;
    mx = -1;
    my = -1;
    slots = {};
    slot_ids = [];
    last_slot_id = -1;
    NODE_CORNER_RADIUS = 20;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    // Update to have multiple tabs & 1 graph per tab
    constructor(canvas_elm){
        // console.log("Here");
        this.canvas = canvas_elm;
        // this.canvas.onmousemove = (ev) => { this.handleMouseMove(ev) };
        // this.canvas.onmousedown = (ev) => { this.handleMouseDown(ev) };
        // this.canvas.onmouseup = (ev) => {this.handleMouseUp(ev) };
        // this.canvas.onwheel = (ev) => { ev.preventDefault(); this.handleWheel(ev) };
        //TODO: Add mouse enter & leave too
        this.context = this.canvas.getContext('2d');
        // this.global_redraw = global_redraw_fn;
    }

    pathExists(start_node, start_slot, end_node, end_slot) {
        let matchExists = false;
        for (let path_id of this.path_ids){
            let path = this.paths[path_id];
            if (path.sn === start_node && path.ss === start_slot && path.en === end_node && path.es === end_slot) {
                matchExists = true;
                break;
            }
            if(path.sn === end_node && path.ss === end_slot && path.en === start_node && path.es === start_slot){
                matchExists = true;
                break;
            }
        }
        return matchExists;
    }

    // Might overlap with multiple
    // Must check only if none selected or some smarter logic
    getOverLapNode(mx, my){
        let ovNode = -1;
        for (let node of this.node_ids){
            let node_data = this.nodes[node];
            if(node_data['x'] <= mx && mx <= node_data['x'] + node_data['w']
                && node_data['y'] <= my && my <= node_data['y'] + node_data['h']){
                ovNode = node;
            }
        }
        return ovNode;
    }

    getOverLapSlotOfNode(mx, my, node_id) {
        let ovSlot = -1;
        let node_data = this.nodes[node_id];
        for (let slot_id of node_data.slot_ids){
            let slot_data = node_data.slots[slot_id];
            let radius = slot_data['r'];
            let center_x = slot_data['x'] + node_data['x'] + radius;
            let center_y = slot_data['y'] + node_data['y'] + radius;
            let dist_x = center_x - mx;
            let dist_y = center_y - my;
            let dist_diff = (radius * radius) - (dist_x * dist_x) - (dist_y * dist_y);
            if (dist_diff > 0){
                ovSlot = slot_id;
            }
        }
        return ovSlot;
    }

    getOverlapElements(mx, my) {
        let ovNode = this.getOverLapNode(mx, my);
        let ovSlot = -1;
        if(ovNode >= 0) {
            ovSlot = this.getOverLapSlotOfNode(mx, my, ovNode);
        }
        return {node: ovNode, slot: ovSlot};
    }

    setOverlapElements(mx, my) {
        let ovData = this.getOverlapElements(mx, my);
        this.current_highlighted = ovData.node;
        this.current_highlighted_slot = ovData.slot;
    }

    //FIXME: Restructure to get overlap element and use logic as per overlap element & current state
    handleMouseMove(event: GraphMouseMoveEvent) {
        if (this.is_generating_path) {
            this.mx = (event.mx) / this.zoom_scale;
            this.my = (event.my) / this.zoom_scale;
            let ovData = this.getOverlapElements(this.mx - this.graph_offset_x, this.my - this.graph_offset_y);
            if (ovData.node !== this.current_highlighted || ovData.slot !== this.current_highlighted_slot) {
                this.target_highlighted = ovData.node;
                this.target_highlighted_slot = ovData.slot;
            }
        } else if (this.currently_dragging >= 0) {
            this.nodes[this.currently_dragging]['x'] = (event.mx) / this.zoom_scale - this.drag_offset_x;
            this.nodes[this.currently_dragging]['y'] = (event.my) / this.zoom_scale - this.drag_offset_y;
        } else if (this.dragging_graph) {
            let mx = (event.mx) / this.zoom_scale;
            let my = (event.my) / this.zoom_scale;
            let diff_x = mx - this.drag_offset_x;
            let diff_y = my - this.drag_offset_y;
            this.drag_offset_x = mx;
            this.drag_offset_y = my;
            this.graph_offset_x += diff_x;
            this.graph_offset_y += diff_y;
        } else {
            let mx = (event.mx) / this.zoom_scale;
            let my = (event.my) / this.zoom_scale;
            this.setOverlapElements(mx - this.graph_offset_x, my - this.graph_offset_y);
        }
    }

    handleMouseDown(event: GraphMouseDownEvent) {
        if(this.currently_dragging < 0 && !this.is_generating_path){
            let mx = event.mx / this.zoom_scale;
            let my = event.my / this.zoom_scale;
            this.setOverlapElements(mx - this.graph_offset_x, my - this.graph_offset_y);
            if(this.current_highlighted >= 0 && this.current_highlighted_slot < 0) {
                this.drag_offset_x = mx - this.nodes[this.current_highlighted]['x'];
                this.drag_offset_y = my - this.nodes[this.current_highlighted]['y'];
                this.currently_dragging = this.current_highlighted;
            }
            if(this.current_highlighted_slot >= 0) {
                this.mx = mx;
                this.my = my;
                this.is_generating_path = true;
            }
            if(this.current_highlighted < 0 && this.current_highlighted_slot < 0){
                this.drag_offset_x = mx;
                this.drag_offset_y = my;
                this.dragging_graph = true;
            }
        }
    }

    handleMouseUp(event: GraphMouseUpEvent) {
        if(this.dragging_graph){
            this.dragging_graph = false;
        }
        if(this.currently_dragging >= 0){
            this.currently_dragging = -1;
        }
        if(this.is_generating_path){
            //FIXME: Generate path
            //FIXME: Shouldn't be able to loop node's output to itself ideally, should be able to form spanning tree for current inputs of a node.
            //FIXME: Input can have exactly one connection to it & that must come from some output.
            //FIXME: Types of input & output node must match.
            if(this.target_highlighted >= 0 && this.target_highlighted_slot >= 0 &&
                !this.pathExists(this.current_highlighted, this.current_highlighted_slot, this.target_highlighted, this.target_highlighted_slot)){
                this.last_path_id += 1;
                this.paths[this.last_path_id] = new GraphPath(this.current_highlighted, this.current_highlighted_slot, this.target_highlighted, this.target_highlighted_slot);
                this.path_ids.push(this.last_path_id);
            }
            this.is_generating_path = false;
            this.target_highlighted = -1;
            this.target_highlighted_slot = -1;
        }
    }

    handleWheel(event: GraphWheelEvent) {
        let zoom_level_jump:number = event.dy / -400;
        let target_zoom_scale = 1 / Math.min(Math.max((1 / this.zoom_scale) + zoom_level_jump , this.MIN_ZOOM), this.MAX_ZOOM);
        let bounding = this.canvas.getBoundingClientRect();
        let m_canvas_x = event.mx;
        let m_canvas_y = event.my;
        let mx:number = (m_canvas_x / this.zoom_scale) - this.graph_offset_x;
        let my:number = (m_canvas_y / this.zoom_scale) - this.graph_offset_y;
        // (mx + toff) * t_zoom_scale = m
        let target_offset_x = (m_canvas_x / target_zoom_scale) - mx;
        let target_offset_y = (m_canvas_y / target_zoom_scale) - my;
        this.graph_offset_x = target_offset_x;
        this.graph_offset_y = target_offset_y;
        this.zoom_scale = target_zoom_scale;
    }

    drawNodeSlots(node_id){
        let node_data = this.nodes[node_id];
        for (let slot_id of node_data.slot_ids) {
            let slot_data = node_data.slots[slot_id];
            let radius = slot_data['r'] * this.zoom_scale;
            let pos_x = (node_data['x'] + slot_data['x'] + this.graph_offset_x) * this.zoom_scale;
            let pos_y = (node_data['y'] + slot_data['y'] + this.graph_offset_y) * this.zoom_scale;
            this.context.beginPath();
            // this.context.fill(pos_x, pos_y, size_x, size_y);
            this.context.arc(pos_x + radius, pos_y + radius, radius, 0, 2 * Math.PI);
            this.context.fillStyle = slot_data['color'];
            this.context.fill();
            let highlighted = false;
            let is_target = false;
            if(this.current_highlighted === node_id && this.current_highlighted_slot === slot_id){
                highlighted = true;
            }
            if(this.target_highlighted === node_id && this.target_highlighted_slot === slot_id){
                is_target = true;
            }
            if(highlighted)
                this.context.strokeStyle = 'yellow';
            else if (is_target)
                this.context.strokeStyle = 'pink';
            else
                this.context.strokeStyle = 'black';
            this.context.stroke();        }
    }

    drawHorizontalLine(pos_y,start_x,end_x,itr){
        let stroke_color = "rgb(53,53,53)";
        if(itr % 8 === 0){
            stroke_color = "rgb(22,22,22)";
        }
        this.context.beginPath();
        this.context.moveTo((start_x + this.graph_offset_x) * this.zoom_scale, (pos_y + this.graph_offset_y) * this.zoom_scale + 0.5);
        this.context.lineTo((end_x + this.graph_offset_x) * this.zoom_scale, (pos_y + this.graph_offset_y) * this.zoom_scale + 0.5);
        this.context.strokeStyle = stroke_color;
        this.context.lineWidth = 1;
        this.context.stroke();
    }

    drawHorizontalGridRegularLines(start_x,start_y,end_x,end_y,step_size){
        let itr = 0;
        let i = start_y;
        while(i <= end_y){
            if(itr % 8 > 0)
                this.drawHorizontalLine(i,start_x,end_x,itr);
            itr += 1;
            i += step_size;
        }
    }

    drawHorizontalGridMajorLines(start_x,start_y,end_x,end_y,step_size){
        let itr = 0;
        let i = start_y;
        while(i <= end_y){
            if(itr % 8 === 0)
                this.drawHorizontalLine(i,start_x,end_x,itr);
            itr += 1;
            i += step_size;
        }
    }

    drawVerticalLine(pos_x,start_y,end_y,itr){
        let stroke_color = "rgb(53,53,53)";
        if(itr % 8 === 0){
            stroke_color = "rgb(22,22,22)";
        }
        this.context.beginPath();
        this.context.moveTo((pos_x + this.graph_offset_x) * this.zoom_scale + 0.5, (start_y + this.graph_offset_y) * this.zoom_scale);
        this.context.lineTo((pos_x + this.graph_offset_x) * this.zoom_scale + 0.5, (end_y + this.graph_offset_y) * this.zoom_scale);
        this.context.strokeStyle = stroke_color;
        this.context.lineWidth = 1;
        this.context.stroke();
    }

    drawVerticalGridRegularLines(start_x,start_y,end_x,end_y,step_size){
        let itr = 0;
        let i = start_x;
        while(i <= end_x){
            if(itr % 8 > 0)
                this.drawVerticalLine(i,start_y,end_y,itr);
            itr += 1;
            i += step_size;
        }
    }

    drawVerticalGridMajorLines(start_x,start_y,end_x,end_y,step_size){
        let itr = 0;
        let i = start_x;
        while(i <= end_x){
            if(itr % 8 === 0)
                this.drawVerticalLine(i,start_y,end_y,itr);
            itr += 1;
            i += step_size;
        }
    }

    drawBoundedGrid(start_x,start_y,end_x,end_y, step_size) {
        this.drawHorizontalGridRegularLines(start_x,start_y,end_x,end_y,step_size);
        this.drawVerticalGridRegularLines(start_x,start_y,end_x,end_y,step_size);
        this.drawHorizontalGridMajorLines(start_x,start_y,end_x,end_y,step_size);
        this.drawVerticalGridMajorLines(start_x,start_y,end_x,end_y,step_size);
    }

    drawGrid() {
        let step_size = this.BASE_GRID_STEP;
        let target_step_size = this.BASE_GRID_STEP / this.zoom_scale;
        while(2 * step_size < target_step_size)
            step_size *= 2;
        let start_x = Math.floor(( 0 - this.graph_offset_x ) / (8 * step_size)) * (8 * step_size);
        let end_x = Math.ceil(((this.canvas.width / this.zoom_scale) - this.graph_offset_x ) / (8 * step_size)) * (8 * step_size);
        let start_y = Math.floor(( 0 - this.graph_offset_y ) / (8 * step_size)) * (8 * step_size);
        let end_y = Math.ceil(((this.canvas.height / this.zoom_scale) - this.graph_offset_y ) / (8 * step_size)) * (8 * step_size);
        this.drawBoundedGrid(start_x,start_y,end_x,end_y, step_size);
    }

    drawNode(node_id) {
        let highlighted = false;
        if(this.current_highlighted === node_id && this.current_highlighted_slot === -1){
            highlighted = true;
        }
        let node_data = this.nodes[node_id];
        let size_x = node_data['w'] * this.zoom_scale;
        let size_y = node_data['h'] * this.zoom_scale;
        let pos_x = (node_data['x'] + this.graph_offset_x) * this.zoom_scale;
        let pos_y = (node_data['y'] + this.graph_offset_y) * this.zoom_scale;
        this.context.beginPath();
        // @ts-ignore
        this.context.roundRect(pos_x, pos_y, size_x, size_y, [this.NODE_CORNER_RADIUS * this.zoom_scale]);
        this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.context.fill();
        // this.context.rect(pos_x, pos_y, size_x, size_y);
        if(highlighted)
            this.context.strokeStyle = 'yellow';
        else
            this.context.strokeStyle = 'black';
        this.context.stroke();
        this.drawNodeSlots(node_id);
    }

    drawAllNodes() {
        for (let node_id of this.node_ids){
            this.drawNode(node_id);
        }
    }

    drawPath(path_id){
        let path_data = this.paths[path_id];
        let start_node_data = this.nodes[path_data.sn];
        let start_slot_data = start_node_data.slots[path_data.ss];
        let end_node_data = this.nodes[path_data.en];
        let end_slot_data = end_node_data.slots[path_data.es];
        let start_x = (start_node_data['x'] + start_slot_data['x'] + start_slot_data['r'] + this.graph_offset_x) * this.zoom_scale;
        let start_y = (start_node_data['y'] + start_slot_data['y'] + start_slot_data['r'] + this.graph_offset_y) * this.zoom_scale;
        let end_x = (end_node_data['x'] + end_slot_data['x'] + end_slot_data['r'] + this.graph_offset_x) * this.zoom_scale;
        let end_y = (end_node_data['y'] + end_slot_data['y'] + end_slot_data['r'] + this.graph_offset_y) * this.zoom_scale;
        this.context.beginPath();
        this.context.moveTo(start_x, start_y);
        this.context.lineTo(end_x, end_y);
        this.context.strokeStyle = "green";
        this.context.stroke();
    }

    drawPaths() {
        for (let path_id of this.path_ids){
            this.drawPath(path_id);
        }
    }

    drawPathToCursor() {
        this.context.beginPath();
        let node_data = this.nodes[this.current_highlighted];
        let slot_data = node_data.slots[this.current_highlighted_slot];
        let center_x = (node_data['x'] + slot_data['x'] + slot_data['r'] + this.graph_offset_x) * this.zoom_scale;
        let center_y = (node_data['y'] + slot_data['y'] + slot_data['r'] + this.graph_offset_y) * this.zoom_scale;
        this.context.moveTo(center_x, center_y);
        this.context.lineTo(this.mx * this.zoom_scale, this.my * this.zoom_scale);
        this.context.strokeStyle = "blue";
        this.context.stroke();
    }

    redrawCanvas() {
        // console.log(this.colors[this.count]);
        // let context = this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.style.background = this.bg_color;
        if(this.IS_GRID_ENABLED) {
            this.drawGrid();
        }
        this.drawAllNodes();
        if(this.is_generating_path){
            this.drawPathToCursor();
        }
        this.drawPaths();
        // context.fill();
        // console.log(this.canvas);
        this.count += 1;
        if(this.count === 5) {
            this.count = 0;
        }
    }

    //FIXME: there should be max iteration / time without any redraws.
    //FIXME: Also there should be stopping of ongoing draw.
    //TODO: Allow partial redraws later on to optimise and change default refresh rate
    updateState() {
        if(!this.redrawing){
            this.redrawing = true;
            this.redrawCanvas();
            this.redrawing = false;
        }
    }

    run() {
        if(!this.is_running){
            this.is_running = true;
            // console.log(this.updateState());
            setInterval(() => { this.updateState(); },this.interval);
        }
    }

    // FIXME: use uuids or something similar for node ids
    addNode(pos_x = 0,pos_y = 0,size_x = 100,size_y = 100, num_in_slots = 0, num_out_slots = 0) {
        this.last_node_id += 1;
        this.node_ids.push(this.last_node_id);
        this.nodes[this.last_node_id] = new GraphNode(pos_x,pos_y,size_x,size_y, num_in_slots, num_out_slots);
    }
}