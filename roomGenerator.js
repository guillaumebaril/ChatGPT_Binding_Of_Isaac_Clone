export default class RoomGenerator {
    constructor() {
        this.tileSize = 32;
        this.roomWidth = 24;
        this.roomHeight = 18;
        this.tiles = {
            FLOOR: '0001',
            WALL: '0002',
            DOOR: '0003',
            ROCK: '0004',
        };
    }

    _createEmptyLayout() {
        const layout = new Array(this.roomHeight);

        for (let y = 0; y < this.roomHeight; y++) {
            layout[y] = new Array(this.roomWidth).fill(this.tiles.FLOOR);
        }

        return layout;
    }

    _addWallsAndDoors(layout, room, map) {
        const centerX = Math.floor(this.roomWidth / 2);
        const centerY = Math.floor(this.roomHeight / 2);

        for (let y = 0; y < this.roomHeight; y++) {
            for (let x = 0; x < this.roomWidth; x++) {
                if (y === 0 || y === this.roomHeight - 1 || x === 0 || x === this.roomWidth - 1) {
                    layout[y][x] = this.tiles.WALL;
                }
            }
        }

        room.adjacentRooms.forEach(adjacentRoom => {
            const dirX = adjacentRoom.x - room.x;
            const dirY = adjacentRoom.y - room.y;

            if (dirY === -1) layout[0][centerX] = this.tiles.DOOR;
            if (dirY === 1) layout[this.roomHeight - 1][centerX] = this.tiles.DOOR;
            if (dirX === -1) layout[centerY][0] = this.tiles.DOOR;
            if (dirX === 1) layout[centerY][this.roomWidth - 1] = this.tiles.DOOR;
        });
    }

    _addRandomObstacles(layout, room) {
        const centerX = Math.floor(this.roomWidth / 2);
        const centerY = Math.floor(this.roomHeight / 2);

        for (let y = 1; y < centerY - 1; y++) {
            for (let x = 1; x < centerX - 1; x++) {
                if (Math.random() < 0.25) {
                    layout[y][x] = this.tiles.ROCK;
                    layout[this.roomHeight - y - 1][x] = this.tiles.ROCK;
                    layout[y][this.roomWidth - x - 1] = this.tiles.ROCK;
                    layout[this.roomHeight - y - 1][this.roomWidth - x - 1] = this.tiles.ROCK;
                }
            }
        }
    }

    generateRoom(room, map) {
        room.widthInTiles = this.roomWidth;
        room.heightInTiles = this.roomHeight;

        const layout = this._createEmptyLayout();
        this._addWallsAndDoors(layout, room, map);
        this._addRandomObstacles(layout, room);

        return layout;
    }
}
