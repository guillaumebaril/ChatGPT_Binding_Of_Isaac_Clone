// PlayerRenderer.js

export class PlayerRenderer {
    constructor() {
      // Initialize any required properties or resources for rendering the player
    }
  
    draw(ctx, player) {
      // Draw the player based on its properties (e.g., position, appearance)
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.position.x, player.position.y, 32, 32);
    }
  }
  