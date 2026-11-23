// Player State & Inventory Management

import { WEAPONS, VEHICLES, RADIO_STATIONS, CAREER_STATS } from './config.js';

export class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.speedKmH = 0;
    this.mode = 'DRIVING'; // 'DRIVING' or 'ON_FOOT'
    this.currentVehicle = { ...VEHICLES.tormenta };
    this.health = 82;
    this.armor = 65;
    this.cash = 24850;
    this.reputation = 4200;
    this.rankTitle = 'RANK 6 · KINGPIN';
    this.selectedWeaponIndex = 2; // Viper SMG
    this.currentRadio = RADIO_STATIONS[0];
    this.stats = { ...CAREER_STATS };
  }

  setMode(mode, vehicleId = 'tormenta') {
    this.mode = mode;
    if (mode === 'DRIVING' && VEHICLES[vehicleId]) {
      this.currentVehicle = { ...VEHICLES[vehicleId] };
    }
  }

  cycleWeapon(dir = 1) {
    this.selectedWeaponIndex = (this.selectedWeaponIndex + dir + WEAPONS.length) % WEAPONS.length;
  }

  selectWeapon(slotNum) {
    const idx = WEAPONS.findIndex(w => w.slot === String(slotNum));
    if (idx !== -1) this.selectedWeaponIndex = idx;
  }

  cycleRadio() {
    const idx = RADIO_STATIONS.findIndex(r => r.id === this.currentRadio.id);
    this.currentRadio = RADIO_STATIONS[(idx + 1) % RADIO_STATIONS.length];
  }

  getSelectedWeapon() {
    return WEAPONS[this.selectedWeaponIndex] || WEAPONS[0];
  }
}
