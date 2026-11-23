// Caleta del Sol 3D — Player State
import { VEHICLE_MODELS } from './config.js';

export class Player {
  constructor() {
    this.x = -120;
    this.y = 0;
    this.z = -180;
    this.rotation = 0.45;
    this.speed = 0;
    this.health = 100;
    this.armor = 100;
    this.cash = 248650;
    this.mode = 'DRIVING'; // 'ON_FOOT' or 'DRIVING'
    this.currentVehicle = VEHICLE_MODELS[0];
    this.selectedWeaponIndex = 0;
    this.currentRadio = { name: 'RADIO VICE CITY', track: 'NEON WAVE DELUXE' };
  }

  update(input, dt) {
    if (this.mode === 'DRIVING') {
      const move = input.getMovement();
      if (move.z > 0) this.speed = Math.min(118, this.speed + 35 * dt);
      else if (move.z < 0) this.speed = Math.max(-30, this.speed - 30 * dt);
      else this.speed *= Math.max(0, 1 - 0.5 * dt);

      if (move.x !== 0 && Math.abs(this.speed) > 1) {
        this.rotation += move.x * 1.5 * dt * (this.speed > 0 ? 1 : -1);
      }

      this.x += Math.sin(this.rotation) * this.speed * dt * 0.5;
      this.z += Math.cos(this.rotation) * this.speed * dt * 0.5;
    }
  }
}
