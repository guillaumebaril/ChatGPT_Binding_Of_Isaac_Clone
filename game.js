import { Room } from "./room.js";
import { generateRooms } from "./map.js";
import { drawMinimap } from "./minimap.js";
import RoomGenerator from './roomGenerator.js';
import RoomRenderer from './roomRenderer.js';
import { updateFPSCounter } from "./fpsCounter.js";
import { Keyboard } from './keyboard.js';

const keyboard = new Keyboard();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


function createMap() {
    const map = generateRooms();
    const roomGenerator = new RoomGenerator();

    map.forEach(room => {
        room.layout = roomGenerator.generateRoom(room, map);
    });

    return map;
}

const roomRenderer = new RoomRenderer(ctx);

const map = createMap();

let currentRoom = map[0]; // Replace with the actual current room

function update() {
    // Check for arrow key presses
    const dx = keyboard.isKeyPressed('ArrowRight') - keyboard.isKeyPressed('ArrowLeft');
    const dy = keyboard.isKeyPressed('ArrowDown') - keyboard.isKeyPressed('ArrowUp');

    if (dx !== 0 || dy !== 0) {
        // Find the adjacent room
        const adjacentRoom = map.find(room => room.x === currentRoom.x + dx && room.y === currentRoom.y + dy);

        // If an adjacent room is found, update the current room
        if (adjacentRoom) {
            currentRoom = adjacentRoom;
        }
    }
}

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the game state
    update();

    // Render the current room
    roomRenderer.drawRoom(currentRoom);

    // Render the minimap
    drawMinimap(ctx, canvas, map, currentRoom);

    // Render the FPS counter
    const fps = updateFPSCounter(Date.now());
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`FPS: ${fps}`, 10, 20);

    // Request the next frame
    requestAnimationFrame(render);
}

// Start the game loop
requestAnimationFrame(render);