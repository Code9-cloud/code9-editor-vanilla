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
    constructor() {
        this.bodyTexture = PIXI.Texture.from(TEXTURES.RegularNodeBody);
        this.glossTexture = PIXI.Texture.from(TEXTURES.RegularNodeTitleGloss);
        this.titleHighlightTexture = PIXI.Texture.from(TEXTURES.RegularNodeTitleHightlight);
        this.shadowTexture = PIXI.Texture.from(TEXTURES.RegularNodeShadow);
        this.shadowSelectedTexture = PIXI.Texture.from(TEXTURES.RegularNodeShadowSelected);
        this.colorSpillTexture = PIXI.Texture.from(TEXTURES.RegularNodeColorSpill);
    }
}

const instance = new TexturesHandler();

Object.freeze(instance);

export default instance;