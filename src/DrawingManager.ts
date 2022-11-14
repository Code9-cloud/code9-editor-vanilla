// Handles drawing of all components, components expose their display affecting attributes & an interface that uses
// those attributes to draw on canvas
// To handle key bindings

export default class DrawingManager {
    UI_REF = null;
    canvas = null;
    constructor(ui_ref, canvas) {
        this.UI_REF = ui_ref;
        this.canvas = canvas;
    }

    draw(){
        let viewport_size = this.UI_REF.VIEWPORT_SIZE;
        let bg_style = this.UI_REF.BG_STYLE;
        if(this.canvas.width !== viewport_size.x){
            this.canvas.width = viewport_size.x;
        }
        if(this.canvas.height !== viewport_size.y){
            this.canvas.height = viewport_size.y;
        }
        this.drawCanvasBackground();
    }

    drawCanvasBackground(){
        this.canvas.style.backgroundColor = this.UI_REF.BG_STYLE.color;
    }
}