// roomRenderer.js
export default class RoomRenderer {
    constructor(context, tileSize = 32) {
        this.ctx = context;
        this.tileSize = tileSize;
        this.tiles = {
            FLOOR: '0001',
            WALL: '0002',
            DOOR: '0003',
            ROCK: '0004',
        };
    }

    _drawFloor(x, y) {
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }

    _drawWall(x, y) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }

    _drawDoor(x, y) {
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }

    _drawRock(x, y) {
        this.ctx.fillStyle = '#888';
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    }

    // roomRenderer.js (modified part)
    drawRoom(room) {
        const { layout } = room;
        const roomWidthInPixels = room.widthInTiles * this.tileSize;
        const roomHeightInPixels = room.heightInTiles * this.tileSize;
        const xOffset = (800 - roomWidthInPixels) / 2;
        const yOffset = (600 - roomHeightInPixels) / 2;

        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const tile = layout[y][x];
                const xPos = x * this.tileSize + xOffset;
                const yPos = y * this.tileSize + yOffset;
                switch (tile) {
                    case this.tiles.FLOOR:
                        this._drawFloor(xPos, yPos);
                        break;
                    case this.tiles.WALL:
                        this._drawWall(xPos, yPos);
                        break;
                    case this.tiles.DOOR:
                        this._drawDoor(xPos, yPos);
                        break;
                    case this.tiles.ROCK:
                        this._drawRock(xPos, yPos);
                        break;
                }
            }
        }
    }
}
