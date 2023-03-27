export class Room {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.adjacentRooms = [];
  }

  addAdjacentRoom(room) {
    this.adjacentRooms.push(room);
  }
}
