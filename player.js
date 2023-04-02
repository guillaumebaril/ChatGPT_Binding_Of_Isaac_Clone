export class Player {
    constructor(health, speed, fireRate, flying) {
        this.health = health;
        this.speed = speed;
        this.fireRate = fireRate;
        this.flying = flying;

        // Initialize position and velocity
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = 300; // You can adjust this value to control the acceleration
        this.deceleration = 1500; // You can adjust this value to control the deceleration
    }

    update(deltaTime, keyboard) {
        const acceleration = this.acceleration * deltaTime;
        const deceleration = this.deceleration * deltaTime;

        this.velocity.x = 0;
        this.velocity.y = 0;
        
        // Handle horizontal movement
        if (keyboard.isKeyDown('KeyA')) {
            this.velocity.x -= acceleration;
        } else if (keyboard.isKeyDown('KeyD')) {
            this.velocity.x += acceleration;
        } else {
            this.velocity.x -= Math.sign(this.velocity.x) * deceleration * deltaTime;
            if (Math.abs(this.velocity.x) < deceleration * deltaTime) {
                this.velocity.x = 0;
            }
        }

        // Handle vertical movement
        if (keyboard.isKeyDown('KeyW')) {
            this.velocity.y -= acceleration;
        } else if (keyboard.isKeyDown('KeyS')) {
            this.velocity.y += acceleration;
        } else {
            this.velocity.y -= Math.sign(this.velocity.y) * deceleration * deltaTime;
            if (Math.abs(this.velocity.y) < deceleration * deltaTime) {
                this.velocity.y = 0;
            }
        }

        // Clamp the velocity to the maximum speed
        const speed = this.speed * deltaTime;
        this.velocity.x = Math.max(-speed, Math.min(speed, this.velocity.x));
        this.velocity.y = Math.max(-speed, Math.min(speed, this.velocity.y));

        // Update position based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
