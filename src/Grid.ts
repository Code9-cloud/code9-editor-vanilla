import * as PIXI from "pixi.js";
import {Application, ICanvas, TilingSprite} from "pixi.js";

export default class Grid {
    gridThickness: number;
    CELL_SIZE : number = 16;
    private app: Application<ICanvas>;
    private gridSprite: TilingSprite;
    constructor(app, x, y) {
        this.gridThickness = 1;
        var tmpContainer = new PIXI.Container;
        var background = new PIXI.Graphics();
        background.beginFill(0x2a2a2a);
        var fullCellSize: number = 8 * this.CELL_SIZE;
        background.drawRect(0, 0, fullCellSize, fullCellSize);
        tmpContainer.addChild(background);

        this.app = app;

        var grid = new PIXI.Graphics();

        tmpContainer.addChild(grid);
        this.drawQuad(grid);

        let renderTexture = PIXI.RenderTexture.create({width: fullCellSize + 1, height: fullCellSize + 1});
        this.app.renderer.render(tmpContainer, {renderTexture: renderTexture, clear: false});

        this.gridSprite = new PIXI.TilingSprite(renderTexture, app.renderer.width, app.renderer.height);
        app.stage.addChild(this.gridSprite);
    }
    drawQuad(grid) {
        var gridThickness = this.gridThickness;
        var fullCellSize = 8 * this.CELL_SIZE;
        for (var i = 0; i < fullCellSize; i += this.CELL_SIZE) {
            grid.lineStyle(gridThickness, 0x353535)
                .moveTo(i, 0)
                .lineTo(i, fullCellSize);
        }

        for (var i = 0; i < fullCellSize; i += this.CELL_SIZE) {
            grid.lineStyle(gridThickness, 0x353535)
                .moveTo(0, i)
                .lineTo(fullCellSize, i);
        }

        grid.lineStyle(gridThickness, 0x1c1c1c)
            .moveTo(0, 0)
            .lineTo(0, fullCellSize + 1);

        grid.lineStyle(gridThickness, 0x1c1c1c)
            .moveTo(fullCellSize + 1, 0)
            .lineTo(fullCellSize + 1, fullCellSize + 1);


        grid.lineStyle(gridThickness, 0x1c1c1c)
            .moveTo(0, 0)
            .lineTo(fullCellSize + 1, 0);

        grid.lineStyle(gridThickness, 0x1c1c1c)
            .moveTo(0, fullCellSize + 1)
            .lineTo(fullCellSize + 1, fullCellSize + 1);
    }
    redraw(x, y) {
        this.gridSprite.tilePosition.x += x;
        this.gridSprite.tilePosition.y += y;
    }
}