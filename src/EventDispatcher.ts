import Queue from "./Queue";
import {
    ESCReleasedEvent,
    GraphEvent,
    GraphMouseDownEvent,
    GraphMouseMoveEvent,
    GraphMouseUpEvent,
    GraphWheelEvent,
    SidePanelResize
} from "./Event";
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

        document.addEventListener("keyup", (ev) => {
            if(ev.key === "ArrowLeft"){
                this.handleEscRelease(ev);
            }
        });

        // this.canvas.addEventListener("keyup", (ev) => {
        //     if(ev.key === "Escape"){
        //         this.handleEscRelease(ev);
        //     }
        // });

        document.getElementById("left").onclick = (ev) => {
            ev.preventDefault();
            this.handleSidePanelSizeReduce();
        };

        document.getElementById("right").onclick = (ev) => {
            ev.preventDefault();
            this.handleSidePanelSizeIncrease();
        };

        document.getElementById("fullscreen").onclick = (ev) => {
            document.body.requestFullscreen();
        }

        document.getElementById("exit-fullscreen").onclick = (ev) => {
            document.exitFullscreen();
        }
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

    handleSidePanelSizeReduce() {
        this.eventQueue.push(new SidePanelResize(this.UI.EDITOR_OFFSET.x > 10 ? this.UI.EDITOR_OFFSET.x - 10 : 0));
    }

    handleSidePanelSizeIncrease() {
        this.eventQueue.push(new SidePanelResize(this.UI.EDITOR_OFFSET.x + 10 < this.canvas.width ? this.UI.EDITOR_OFFSET.x + 10 : this.canvas.width));
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

    execPreRender(){
        try {
            this.UI.execPreRender();
        } finally {

        }
    }

    private handleEscRelease(ev:KeyboardEvent) {
        console.log("Esc Pressed");
        ev.preventDefault();
        this.eventQueue.push(new ESCReleasedEvent());
    }
}