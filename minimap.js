const MINIMAP_SIZE = 96;
const ROOM_SIZE = 8;
const ROOM_BORDER = 1;
const MINIMAP_MARGIN = 4;

export function drawMinimap(ctx, canvas, rooms, currentRoom) {
    ctx.save(); // Save the current context state
    ctx.globalAlpha = 1; // Set the opacity to 50%

    // Calculate the bounding box of the rooms
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    rooms.forEach(room => {
        minX = Math.min(minX, room.x);
        maxX = Math.max(maxX, room.x);
        minY = Math.min(minY, room.y);
        maxY = Math.max(maxY, room.y);
    });

    // Calculate scale factor if necessary
    const mapWidth = (maxX - minX + 1) * ROOM_SIZE;
    const mapHeight = (maxY - minY + 1) * ROOM_SIZE;
    const scaleFactor = Math.min(
        1,
        MINIMAP_SIZE / mapWidth,
        MINIMAP_SIZE / mapHeight
    );

    // Calculate the top-right corner position
    const topRightX = canvas.width - MINIMAP_SIZE - MINIMAP_MARGIN;
    const topRightY = MINIMAP_MARGIN;

    // Draw the minimap background
    ctx.fillStyle = '#000';
    ctx.fillRect(topRightX, topRightY, MINIMAP_SIZE, MINIMAP_SIZE);

    // Draw the rooms on the minimap
    rooms.forEach((room, i) => {
        const x = topRightX + (room.x - minX) * ROOM_SIZE * scaleFactor;
        const y = topRightY + (room.y - minY) * ROOM_SIZE * scaleFactor;
        const size = ROOM_SIZE * scaleFactor;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = ROOM_BORDER;
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x, y, size, size);
        ctx.strokeRect(x, y, size, size);
    });

    const drawCurrentRoom = (room) => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        const size = ROOM_SIZE * scaleFactor;
        const x = topRightX + (room.x - minX) * ROOM_SIZE * scaleFactor + size / 2;
        const y = topRightY + (room.y - minY) * ROOM_SIZE * scaleFactor + size / 2;
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      };
      
      drawCurrentRoom(currentRoom);

    ctx.restore(); // Restore the context state
}
