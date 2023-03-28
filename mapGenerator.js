// MapGenerator.js
import { Room } from "./room.js";
import RoomGenerator from './roomGenerator.js';

const MIN_ROOMS = 20;
const MAX_ROOMS = 50;
const DIRECTIONS = [
  { x: -1, y: 0 }, // gauche
  { x: 1, y: 0 }, // droite
  { x: 0, y: -1 }, // haut
  { x: 0, y: 1 }, // bas
];

export class MapGenerator {
  constructor() {}

  getRandomDirection() {
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  }

  roomExists(rooms, x, y) {
    return rooms.some(room => room.x === x && room.y === y);
  }

  generateRooms() {
    const numRooms = Math.floor(Math.random() * (MAX_ROOMS - MIN_ROOMS + 1)) + MIN_ROOMS;
    const rooms = [];

    // Créez la première salle
    const startX = 0;
    const startY = 0;
    const firstRoom = new Room(startX, startY);
    rooms.push(firstRoom);

    // Créez les salles restantes et définissez les salles adjacentes
    while (rooms.length < numRooms) {
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      const newAdjacentRooms = Math.floor(Math.random() * 3) + 1; // 1 à 4 salles adjacentes

      for (let i = 0; i < newAdjacentRooms && rooms.length < numRooms; i++) {
        let direction = this.getRandomDirection();
        let newX = randomRoom.x + direction.x;
        let newY = randomRoom.y + direction.y;

        if (!this.roomExists(rooms, newX, newY)) {
          const newRoom = new Room(newX, newY);
          newRoom.addAdjacentRoom(randomRoom);
          randomRoom.addAdjacentRoom(newRoom);
          rooms.push(newRoom);
        }
      }
    }

    return rooms;
  }

  createMap() {
    const map = this.generateRooms();
    const roomGenerator = new RoomGenerator();

    map.forEach(room => {
      room.layout = roomGenerator.generateRoom(room, map);
    });

    return map;
  }
}
