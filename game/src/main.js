// Caleta del Sol 3D — Main Game Loop
import { InputManager } from './input.js';
import { GameWorld } from './world.js';
import { GameHUD } from './hud.js';
import { ThreeRenderer } from './render3d.js';
import { applyShotQuery } from './shots.js';
import { UIManager } from './ui.js';

class GameApp {
  constructor() {
    this.input = new InputManager();
    this.world = new GameWorld();
    this.hud = new GameHUD(document.getElementById('hud-canvas'));
    this.renderer = new ThreeRenderer(document.getElementById('webgl-canvas'));
    this.ui = new UIManager(document.getElementById('ui-overlay'), this);

    this.options = applyShotQuery(this.world, window.location.search);
    this.lastTime = performance.now();
    this.init();
  }

  init() {
    this.renderer.setupScene(this.world);
    if (this.options.titleMode) {
      this.ui.showTitleScreen();
    }
    requestAnimationFrame((t) => this.loop(t));
  }

  loop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    if (!this.options.titleMode) {
      this.world.update(this.input, dt);
    }

    this.renderer.render(this.world, this.options);
    this.hud.draw(this.world, this.options);

    requestAnimationFrame((t) => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => new GameApp());
