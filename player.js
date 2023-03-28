export class Player {
    constructor(health, speed, fireRate, flying) {
      this.health = health;
      this.speed = speed;
      this.fireRate = fireRate;
      this.flying = flying;
  
      // Initialize position and velocity
      this.position = { x: 0, y: 0 };
      this.velocity = { x: 0, y: 0 };
    }
  
    update(deltaTime, keyboard) {
      const speed = this.speed * deltaTime;
  
      // Handle horizontal movement
      if (keyboard.isKeyDown('KeyA')) {
        this.velocity.x = -speed;
      } else if (keyboard.isKeyDown('KeyD')) {
        this.velocity.x = speed;
      } else {
        this.velocity.x = 0;
      }
  
      // Handle vertical movement
      if (keyboard.isKeyDown('KeyW')) {
        this.velocity.y = -speed;
      } else if (keyboard.isKeyDown('KeyS')) {
        this.velocity.y = speed;
      } else {
        this.velocity.y = 0;
      }
  
      // Update position based on velocity
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
  