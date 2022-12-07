import {RectSize} from "./Size";
import {Shape} from "./Shape";

interface HasOnHover {
    onHover(hoverLocation: Point);
}

interface HasOnHoverExit {
    onHoverExit();
}

interface HasOnMove {
    onMove(moveLocation: Point);
}

interface HasOnLeftClick {
    onLeftClick();
}

interface HasOnRightClick {
    onRightClick();
}

interface HasOnWheelUp {
    onWheelUp(wheelLocation: Point, wheelDelta: number);
}

//TODO: move this to Physics based overlap
//TODO: Make the component like Unreal Actor, which can have multiple meshes, collision elements etc.
export abstract class UIElement {
    position: Point;
    boundingSize : RectSize;
    abstract pointOverlapsElement(p: Point) : boolean;
}

// TODO: Below is not needed, an Element Group can be implemented through element class itself.
// Invariant :- boundingSize of Group >= max(boundingSize elements)
export abstract class UIElementGroup {
    position: Point;
    boundingSize : RectSize;
}