// Caleta del Sol 3D — World Entity Manager
import { Player } from './player.js';
import { PoliceSystem } from './police.js';
import { STORY_MISSIONS, DISTRICTS } from './config.js';

export class GameWorld {
  constructor() {
    this.player = new Player();
    this.police = new PoliceSystem();
    this.missions = STORY_MISSIONS;
    this.activeMission = this.missions[0];
    this.districts = DISTRICTS;
    this.buildings = [];
    this.traffic = [];
    this.pedestrians = [];
    this.initWorldEntities();
  }

  initWorldEntities() {
    for (let x = -400; x <= 400; x += 100) {
      for (let z = -400; z <= 400; z += 100) {
        if (Math.abs(x) < 40 && Math.abs(z) < 40) continue;
        this.buildings.push({
          x: x + 15,
          z: z + 15,
          w: 60,
          d: 60,
          h: 40 + ((Math.abs(x * 7 + z * 13)) % 120),
          color: ((x + z) % 200 === 0) ? '#1e293b' : '#0f172a',
        });
      }
    }
  }

  update(input, dt) {
    this.player.update(input, dt);
    this.police.update(this.player, dt);
  }
}
