import UserInterface from "./UserInterface";
import DrawingManager from "./DrawingManager";
import EventDispatcher from "./EventDispatcher";

enum OrchestratorUIState{
    Init,
    EventProcessing,
    PreRendering,
    Rendering,
    Halt
}

export default class Orchestrator {
    // Event Loop cycle in order [ Updating UI -> PreRender -> Drawing -> Updating UI ]
    UI_STATE = OrchestratorUIState.Halt;
    DRAW_INTERVAL = 1;
    // Rendering related timestamps
    last_prerender_at = 0;
    last_render_start_at = 0;
    last_render_at = 0;
    UI : UserInterface = null;
    DM : DrawingManager = null;
    ED : EventDispatcher;
    constructor(draw_interval = 1, canvas = null) {
        this.DRAW_INTERVAL = draw_interval;
        this.UI = new UserInterface(canvas);
        this.DM = new DrawingManager(this.UI, canvas);
        this.ED = new EventDispatcher(this.UI, canvas);
        this.ED.registerEvents();
        this.UI_STATE = OrchestratorUIState.Init;
        this.ED.registerOnEventProcessed(() => { this.onEventProcessed(); });
    }

    // Start scheduling tasks as per config
    begin(){
        this.UI_STATE = OrchestratorUIState.Rendering;
        this.last_prerender_at = Date.now();
        this.last_render_start_at = Date.now();
        this.DM.draw();
        this.last_render_at = Date.now();
        this.UI_STATE = OrchestratorUIState.EventProcessing;
        setInterval((): void => { this.run(); } , 10);
    }

    run(){
        // this.UI_STATE = OrchestratorUIState.EventProcessing;
        // // TODO: Move to web worker
        // this.ED.execEvents();
        this.ED.processEvents = false;
        let now = Date.now();
        if(!this.ED.inProgress && (now - this.last_render_at > this.DRAW_INTERVAL)) {
            this.UI_STATE = OrchestratorUIState.PreRendering;
            //TODO: Pre render here
            // console.log("Pre render")
            //
            this.last_prerender_at = Date.now();
            this.UI_STATE = OrchestratorUIState.Rendering;
            // console.log("Draw")
            this.last_render_start_at = Date.now();
            this.DM.draw();
            this.last_render_at = Date.now();
        }
        this.UI_STATE = OrchestratorUIState.EventProcessing;
        this.ED.processEvents = true;
        this.ED.execEvents();
    }

    onEventProcessed() {
        if(Date.now() - this.last_render_at > this.DRAW_INTERVAL) {
            this.ED.processEvents = false;
        }
    }
}