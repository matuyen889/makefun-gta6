// Caleta del Sol 3D — Input System
export class InputManager {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, dx: 0, dy: 0, isDown: false, rightDown: false };
    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener('keydown', (e) => { this.keys[e.code] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });
    window.addEventListener('mousemove', (e) => {
      this.mouse.dx = e.movementX || 0;
      this.mouse.dy = e.movementY || 0;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.mouse.isDown = true;
      if (e.button === 2) this.mouse.rightDown = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.isDown = false;
      if (e.button === 2) this.mouse.rightDown = false;
    });
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  isPressed(code) { return !!this.keys[code]; }
  getMovement() {
    let x = 0, z = 0;
    if (this.isPressed('KeyW')) z += 1;
    if (this.isPressed('KeyS')) z -= 1;
    if (this.isPressed('KeyA')) x -= 1;
    if (this.isPressed('KeyD')) x += 1;
    return { x, z };
  }
}
