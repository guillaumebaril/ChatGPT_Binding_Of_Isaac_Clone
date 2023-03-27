// keyboard.js
export class Keyboard {
    constructor() {
        this.keys = new Map();

        // Bind the event listeners
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        this.keys.set(event.code, true);
    }

    onKeyUp(event) {
        this.keys.set(event.code, false);
    }

    isKeyDown(keyCode) {
        return this.keys.get(keyCode) || false;
    }

    isKeyPressed(keyCode) {
        var pressed = this.keys.get(keyCode) || false;
        this.keys.set(keyCode, false);
        return pressed;
    }
}
