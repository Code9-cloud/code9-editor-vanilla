import Queue from "./Queue";
import {GraphEvent, GraphMouseDownEvent, GraphMouseMoveEvent, GraphMouseUpEvent, GraphWheelEvent} from "./Event";
import UserInterface from "./UserInterface";
export default class EventDispatcher {
    processEvents : boolean = false;
    inProgress : boolean = false;
    canvas : HTMLCanvasElement = null;
    eventQueue : Queue<GraphEvent> = null;
    UI : UserInterface;
    private onEventProcessed: () => void;
    constructor(UI: UserInterface, canvas) {
        this.canvas = canvas;
        this.eventQueue = new Queue<GraphEvent>();
        this.UI = UI;
        this.onEventProcessed = (): void => {};
    }

    registerOnEventProcessed(handler: () => void){
        this.onEventProcessed = handler;
    }

    registerEvents(){
        this.canvas.onmousedown = (ev:MouseEvent) => {
            ev.preventDefault();
            this.handleMouseDown(ev);
        };

        this.canvas.onmousemove = (ev:MouseEvent) => {
            ev.preventDefault();
            this.handleMouseMove(ev);
        };

        this.canvas.onmouseup = (ev:MouseEvent) => {
            ev.preventDefault();
            this.handleMouseUp(ev);
        };

        this.canvas.onwheel = (ev:WheelEvent) => {
            ev.preventDefault();
            this.handleWheel(ev);
        };
    }

    handleMouseDown(ev:MouseEvent){
        let bounding = this.canvas.getBoundingClientRect();
        this.eventQueue.push(new GraphMouseDownEvent(ev.clientX - bounding.left, ev.clientY - bounding.top));
    }

    handleMouseMove(ev:MouseEvent){
        let bounding = this.canvas.getBoundingClientRect();
        this.eventQueue.push(new GraphMouseMoveEvent(ev.clientX - bounding.left, ev.clientY - bounding.top));
    }

    handleMouseUp(ev:MouseEvent){
        let bounding = this.canvas.getBoundingClientRect();
        this.eventQueue.push(new GraphMouseUpEvent(ev.clientX - bounding.left, ev.clientY - bounding.top));
    }

    handleWheel(ev:WheelEvent) {
        let bounding = this.canvas.getBoundingClientRect();
        this.eventQueue.push(new GraphWheelEvent(ev.clientX - bounding.left, ev.clientY - bounding.top, ev.deltaY));
    }

    execEvents() {
        while (this.processEvents && !this.eventQueue.isEmpty()) {
            this.inProgress = true;
            let ev = this.eventQueue.pop();
            try {
                this.UI.execEvent(ev);
            } finally {
                this.inProgress = false;
                this.onEventProcessed();
            }
        }
    }
}