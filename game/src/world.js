// Open World Simulation State & Entities

import { DISTRICTS, MISSIONS, VEHICLES } from './config.js';
import { PoliceSystem } from './police.js';
import { Player } from './player.js';

export class World {
  constructor() {
    this.districts = [...DISTRICTS];
    this.currentDistrict = this.districts[0];
    this.player = new Player();
    this.police = new PoliceSystem();
    this.activeMission = MISSIONS[4]; // Mission 5 Highway Takedown
    this.missionStage = 2;
    this.timeStr = '18:45';
    this.weather = 'SUNSET_GOLDEN_HOUR';

    this.traffic = [];
    this.pedestrians = [];
    this.buildings = [];
    this.palmTrees = [];

    this.initCityLayout();
  }

  initCityLayout() {
    // Generate beachfront hotels and skyline buildings
    const buildingNames = [
      'HOTEL SERIWA', 'MALUN SUITES', 'LAGUNA RASI', 'PIRA PALACE',
      'CORAL TOWER', 'ORU HEIGHTS', 'SOLARIS HOTEL', 'MARINA BREEZE',
      'AZUR TOWERS', 'PALM RESIDENCES', 'BAHIA PLAZA', 'NEXUS LOFTS'
    ];

    for (let i = 0; i < 24; i++) {
      const z = -200 + i * 25;
      const x = 32 + (i % 2 === 0 ? 0 : 25);
      const height = 25 + (i % 5) * 15;
      this.buildings.push({
        name: buildingNames[i % buildingNames.length],
        x,
        y: height / 2,
        z,
        width: 18,
        depth: 20,
        height,
        color: i % 3 === 0 ? 0xe2e8f0 : i % 3 === 1 ? 0xfef08a : 0xfbcfe8,
        neonColor: i % 2 === 0 ? '#ec4899' : '#38bdf8',
      });
    }

    // Palm trees along the beach promenade (x = 10 to 14)
    for (let i = 0; i < 30; i++) {
      this.palmTrees.push({
        x: 12 + (i % 2 === 0 ? -1.5 : 1.5),
        y: 0,
        z: -250 + i * 20,
        scale: 0.9 + (i % 3) * 0.15,
      });
    }

    // Traffic cars
    this.traffic = [
      { id: 1, type: 'interceptor', name: 'MSPD Cruiser', x: -3.5, y: 0.8, z: 22, speed: 110, isPolice: true, lightsFlashing: true },
      { id: 2, type: 'interceptor', name: 'MSPD Cruiser', x: 3.5, y: 0.8, z: 38, speed: 105, isPolice: true, lightsFlashing: true },
      { id: 3, type: 'vaquero', name: 'Vaquero 440', x: -3.5, y: 0.8, z: -45, speed: 90, isPolice: false, lightsFlashing: false },
      { id: 4, type: 'solstice', name: 'Solstice V12', x: 3.5, y: 0.8, z: -85, speed: 115, isPolice: false, lightsFlashing: false },
    ];

    // Pedestrians on the beach and sidewalk
    this.pedestrians = [
      { id: 1, x: 14, y: 0, z: -12, state: 'RUNNING', clothColor: 0x3b82f6 },
      { id: 2, x: 16, y: 0, z: -8, state: 'FLEEING', clothColor: 0xec4899 },
      { id: 3, x: 22, y: 0, z: -35, state: 'WATCHING', clothColor: 0xf59e0b },
      { id: 4, x: -16, y: 0, z: 15, state: 'RUNNING', clothColor: 0x10b981 },
      { id: 5, x: 8, y: 0, z: 5, state: 'RAGDOLL', clothColor: 0xef4444 }, // Downed syndicate thug
    ];
  }

  setDistrict(districtId) {
    const found = this.districts.find(d => d.id === districtId);
    if (found) this.currentDistrict = found;
  }

  setMission(missionId) {
    const found = MISSIONS.find(m => m.id === missionId);
    if (found) this.activeMission = found;
  }
}
