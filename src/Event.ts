export const UI_EVENT_TYPE = 0;
// Maintain 2 queues, 1 for UI events, 1 for events / commands to description

export enum GraphEventTypes {
    MOUSEDOWN,
    MOUSEUP,
    MOUSEMOVE,
    WHEEL,
    SIDE_PANEL_RESIZE,
    ESC_RELEASE
}

export class GraphEvent {
    // Event Type
    et : GraphEventTypes
    constructor(et : GraphEventTypes) {
        this.et = et;
    }
}

export class GraphMouseDownEvent extends GraphEvent {
    mx: number;
    my: number;
    constructor(mx, my) {
        super(GraphEventTypes.MOUSEDOWN);
        this.mx = mx;
        this.my = my;
    }
}

export class GraphMouseMoveEvent extends GraphEvent {
    mx: number;
    my: number;
    constructor(mx, my) {
        super(GraphEventTypes.MOUSEMOVE);
        this.mx = mx;
        this.my = my;
    }
}

export class GraphMouseUpEvent extends GraphEvent {
    mx: number;
    my: number;
    constructor(mx, my) {
        super(GraphEventTypes.MOUSEUP);
        this.mx = mx;
        this.my = my;
    }
}

export class GraphWheelEvent extends GraphEvent {
    mx: number;
    my: number;
    dy: number;
    constructor(mx, my, dy) {
        super(GraphEventTypes.WHEEL);
        this.mx = mx;
        this.my = my;
        this.dy = dy;
    }
}

export class ESCReleasedEvent extends GraphEvent {
    constructor() {
        super(GraphEventTypes.ESC_RELEASE);
    }
}

export class SidePanelResize extends GraphEvent {
    w: number;
    constructor(w) {
        super(GraphEventTypes.SIDE_PANEL_RESIZE);
        this.w = w;
    }
}