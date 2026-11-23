// Caleta del Sol 3D — Deterministic Screenshot Scene Staging (?shot=action|combat|map|title)

import { MISSIONS } from './config.js';

export function stageShot(name, world, render3d, hud, ui) {
  switch (name) {
    case 'action':
    case 'cover':
      // 1. High-Speed Coastal Chase (Cover Shot)
      world.player.setMode('DRIVING', 'tormenta');
      world.player.speedKmH = 118;
      world.police.setWanted(4); // 4 Stars, Condor-1 Air Unit Active
      world.activeMission = MISSIONS[4]; // Mission 5 Highway Takedown

      render3d.setupActionChaseScene();
      render3d.render();
      hud.draw(world, { combatMode: false });
      break;

    case 'combat':
    case 'shootout':
      // 2. Third-Person Shootout in Neon Bazaar
      world.player.setMode('ON_FOOT');
      world.player.selectWeapon(5); // Carbine AR-15
      world.police.setWanted(2);
      world.activeMission = MISSIONS[2]; // Mission 3 Neon Bazaar Ambush

      render3d.setupShootoutScene();
      render3d.render();
      hud.draw(world, { combatMode: true });
      break;

    case 'map':
    case 'stats':
      // 3. Full World Map, 68.4% Completion Gauge & Career Stats
      world.police.setWanted(4);
      ui.drawMapAndStatsScreen(world);
      break;

    case 'title':
    case 'start':
    default:
      // 4. Sunset Skyline Title Screen with Save Slots
      render3d.setupSkylineTitleScene();
      render3d.render();
      ui.drawTitleScreen(world);
      break;
  }
}
