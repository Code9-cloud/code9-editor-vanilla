import GraphEditor from "./GraphEditor";
import {
    ESCReleasedEvent,
    GraphEvent,
    GraphEventTypes,
    GraphMouseDownEvent,
    GraphMouseMoveEvent,
    GraphMouseUpEvent,
    GraphWheelEvent,
    SidePanelResize
} from "./Event";

//TODO: Need to introduce menu & side panel here, this allows graph editor to remain isolated entity.
export default class UserInterface {
    VIEWPORT_SIZE = { x : 1920, y : 1080};
    BG_STYLE = { pattern: "solid", color : 'rgb(38,38,38)'};
    EDITOR_OFFSET = {x: 100, y: 100};
    //FIXME: Reduced size for testing.
    EDITOR_SIZE = {w: 120, h: 80};
    editor : GraphEditor = null;
    //FIXME: Reduced size for testing.
    constructor(canvas, viewport_size = { x : 120, y : 80}, bg_style = { pattern: "solid", color : 'rgb(38,38,38)'}) {
        this.VIEWPORT_SIZE = viewport_size;
        this.BG_STYLE = bg_style;
        this.VIEWPORT_SIZE = viewport_size;
        this.EDITOR_SIZE.w = this.VIEWPORT_SIZE.x - this.EDITOR_OFFSET.x;
        this.EDITOR_SIZE.h = this.VIEWPORT_SIZE.y - this.EDITOR_OFFSET.y;
        this.editor = new GraphEditor(canvas, this.EDITOR_OFFSET, this.EDITOR_SIZE);
        this.editor.run();
        // this.editor.addNode();
        // this.editor.addNode("node1", 100,300);
        // this.editor.addNode("node1",50,400);
        // this.editor.addNode("node1",200,400,100,100, 1, 1);
        // this.editor.addNode("node1",220,420,100,100, 2, 2);
    }

    isFullScreen() {
        return this.editor.IS_FULLSCREEN;
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
            case GraphEventTypes.SIDE_PANEL_RESIZE : this.editor.handleResize(ev as SidePanelResize); break;
            case GraphEventTypes.ESC_RELEASE : this.editor.handleEscRelease(ev as ESCReleasedEvent); break;
        }
    }

    execPreRender() {
        this.editor.handlePreRender();
    }
}