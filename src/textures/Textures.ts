import {TEXTURES} from '../resources';
import * as PIXI from 'pixi.js';
import {Resource, Texture} from "pixi.js";

class TexturesHandler {
    colorSpillTexture: Texture<Resource>;
    shadowSelectedTexture: Texture<Resource>;
    shadowTexture: Texture<Resource>;
    titleHighlightTexture: Texture<Resource>;
    glossTexture: Texture<Resource>;
    bodyTexture: Texture<Resource>;
    pinConnected: Texture<Resource>;
    pinDisconnected: Texture<Resource>;
    constructor() {
    }

    async load(){
        this.bodyTexture = await PIXI.Assets.load(TEXTURES.RegularNodeBody);
        this.glossTexture = await PIXI.Assets.load(TEXTURES.RegularNodeTitleGloss);
        this.titleHighlightTexture = await PIXI.Assets.load(TEXTURES.RegularNodeTitleHightlight);
        this.shadowTexture = await PIXI.Assets.load(TEXTURES.RegularNodeShadow);
        this.shadowSelectedTexture = await PIXI.Assets.load(TEXTURES.RegularNodeShadowSelected);
        this.colorSpillTexture = await PIXI.Assets.load(TEXTURES.RegularNodeColorSpill);
        this.pinConnected = await PIXI.Assets.load(TEXTURES.PinConnected);
        this.pinDisconnected = await PIXI.Assets.load(TEXTURES.PinDisconnected);
    }
}

const instance = new TexturesHandler();

// Object.freeze(instance);

export default instance;