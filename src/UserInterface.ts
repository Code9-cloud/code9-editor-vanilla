import GraphEditor from "./GraphEditor";
import {
    GraphEvent,
    GraphEventTypes,
    GraphMouseDownEvent,
    GraphMouseMoveEvent,
    GraphMouseUpEvent,
    GraphWheelEvent
} from "./Event";

export default class UserInterface {
    VIEWPORT_SIZE = { x : 1920, y : 1080};
    BG_STYLE = { pattern: "solid", color : 'rgb(38,38,38)'};
    editor : GraphEditor = null;
    constructor(canvas, viewport_size = { x : 1920, y : 1080}, bg_style = { pattern: "solid", color : 'rgb(38,38,38)'}) {
        this.VIEWPORT_SIZE = viewport_size;
        this.BG_STYLE = bg_style;
        this.editor = new GraphEditor(canvas);
        this.editor.run();
        this.editor.addNode();
        this.editor.addNode(100,300);
        this.editor.addNode(100,300);
        this.editor.addNode(200,400,100,100, 1, 1);
        this.editor.addNode(220,420,100,100, 2, 2);
    }

    setBgStyle(bg_style){
        this.BG_STYLE = bg_style;
    }

    getViewportSize(){
        return this.VIEWPORT_SIZE;
    }

    getBgStyle(){
        return this.BG_STYLE;
    }

    execEvent(ev:GraphEvent) {
        switch (ev.et) {
            case GraphEventTypes.MOUSEDOWN: this.editor.handleMouseDown(ev as GraphMouseDownEvent); break;
            case GraphEventTypes.MOUSEUP: this.editor.handleMouseUp(ev as GraphMouseUpEvent); break;
            case GraphEventTypes.MOUSEMOVE: this.editor.handleMouseMove(ev as GraphMouseMoveEvent); break;
            case GraphEventTypes.WHEEL: this.editor.handleWheel(ev as GraphWheelEvent); break;
        }
    }
}