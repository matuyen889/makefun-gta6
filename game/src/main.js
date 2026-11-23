// Caleta del Sol 3D — Main Entrypoint & Game Loop

import { World } from './world.js';
import { Render3D } from './render3d.js';
import { GameHUD } from './hud.js';
import { GameUI } from './ui.js';
import { stageShot } from './shots.js';

window.addEventListener('DOMContentLoaded', () => {
  const webglCanvas = document.getElementById('webgl-canvas');
  const hudCanvas = document.getElementById('hud-canvas');

  const world = new World();
  const render3d = new Render3D(webglCanvas);
  const hud = new GameHUD(hudCanvas);
  const ui = new GameUI(hudCanvas);

  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');

  if (shot) {
    // Deterministic screenshot scene rendering
    stageShot(shot, world, render3d, hud, ui);
    const status = document.getElementById('status');
    if (status) status.textContent = `Scene ${shot} rendered`;
    return;
  }

  // Interactive Play Mode
  let isMapOpen = false;
  stageShot('action', world, render3d, hud, ui);

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M' || e.key === 'Escape') {
      isMapOpen = !isMapOpen;
      if (isMapOpen) {
        ui.drawMapAndStatsScreen(world);
      } else {
        render3d.render();
        hud.draw(world);
      }
    }
    if (e.key >= '1' && e.key <= '5') {
      world.player.selectWeapon(Number(e.key));
      if (!isMapOpen) hud.draw(world);
    }
    if (e.key === 'r' || e.key === 'R') {
      world.player.cycleRadio();
      if (!isMapOpen) hud.draw(world);
    }
    if (e.key === 'f' || e.key === 'F') {
      const nextMode = world.player.mode === 'DRIVING' ? 'ON_FOOT' : 'DRIVING';
      world.player.setMode(nextMode);
      if (nextMode === 'ON_FOOT') {
        render3d.setupShootoutScene();
      } else {
        render3d.setupActionChaseScene();
      }
      render3d.render();
      hud.draw(world, { combatMode: nextMode === 'ON_FOOT' });
    }
  });

  // Animation Loop
  function loop() {
    if (!isMapOpen) {
      render3d.render();
      hud.draw(world);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
