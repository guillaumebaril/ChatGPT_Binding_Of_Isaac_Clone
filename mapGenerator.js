// MapGenerator.js
import { Room } from "./room.js";
import RoomGenerator from './roomGenerator.js';

const MIN_ROOMS = 20;
const MAX_ROOMS = 30;
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
  
    // Create the first room
    const startX = 0;
    const startY = 0;
    const firstRoom = new Room(startX, startY);
    rooms.push(firstRoom);
  
    // Create the remaining rooms and set the adjacent rooms
    let attempts = 0;
    while (rooms.length < numRooms && attempts < numRooms * 10) {
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
      const availableDirections = DIRECTIONS.filter(direction => {
        const newX = randomRoom.x + direction.x * 2;
        const newY = randomRoom.y + direction.y * 2;
        return !this.roomExists(rooms, newX, newY);
      });
  
      if (availableDirections.length > 0) {
        const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        const corridorX = randomRoom.x + direction.x;
        const corridorY = randomRoom.y + direction.y;
        const newX = corridorX + direction.x;
        const newY = corridorY + direction.y;
  
        const corridorRoom = new Room(corridorX, corridorY);
        const newRoom = new Room(newX, newY);
  
        corridorRoom.addAdjacentRoom(randomRoom);
        randomRoom.addAdjacentRoom(corridorRoom);
        rooms.push(corridorRoom);
  
        corridorRoom.addAdjacentRoom(newRoom);
        newRoom.addAdjacentRoom(corridorRoom);
        rooms.push(newRoom);
  
        // Link the corridor room with other existing adjacent rooms
        DIRECTIONS.forEach(dir => {
          const adjX = corridorRoom.x + dir.x;
          const adjY = corridorRoom.y + dir.y;
          const existingAdjacentRoom = rooms.find(room => room.x === adjX && room.y === adjY);
          if (existingAdjacentRoom) {
            corridorRoom.addAdjacentRoom(existingAdjacentRoom);
            existingAdjacentRoom.addAdjacentRoom(corridorRoom);
          }
        });
  
        // Link the new room with other existing adjacent rooms
        DIRECTIONS.forEach(dir => {
          const adjX = newRoom.x + dir.x;
          const adjY = newRoom.y + dir.y;
          const existingAdjacentRoom = rooms.find(room => room.x === adjX && room.y === adjY);
          if (existingAdjacentRoom) {
            newRoom.addAdjacentRoom(existingAdjacentRoom);
            existingAdjacentRoom.addAdjacentRoom(newRoom);
          }
        });
      } else {
        attempts++; // Increment the attempts when there are no available directions
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
