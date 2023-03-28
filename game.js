import { Room } from "./room.js";
import { MapGenerator } from './MapGenerator.js';
import { drawMinimap } from "./minimap.js";
import RoomRenderer from './roomRenderer.js';
import { updateFPSCounter } from "./fpsCounter.js";
import { Keyboard } from './keyboard.js';
import { Player } from './player.js';
import { PlayerRenderer } from './PlayerRenderer.js';

const player = new Player(100, 60, 10, false);
const playerRenderer = new PlayerRenderer();
const mapGenerator = new MapGenerator();

const keyboard = new Keyboard();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const map = mapGenerator.createMap();
const roomRenderer = new RoomRenderer(ctx);


let currentRoom = map[0]; // Replace with the actual current room

function update(deltaTime) {
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

    // Update the player
    player.update(deltaTime, keyboard);
}

let lastFrameTime = performance.now();

function render(timestamp) {

    const deltaTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the game state
    update(deltaTime);

    // Render the current room
    roomRenderer.drawRoom(currentRoom);

    playerRenderer.draw(ctx, player);

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