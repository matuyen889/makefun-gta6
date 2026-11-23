// Caleta del Sol 3D — Police Tactical Response
export class PoliceSystem {
  constructor() {
    this.wantedLevel = 3; // 1 to 5 stars
    this.heat = 65;
    this.units = [
      { id: 'p1', x: -160, z: -140, type: 'CRUISER', status: 'PURSUIT' },
      { id: 'p2', x: -80, z: -210, type: 'INTERCEPTOR', status: 'PURSUIT' },
      { id: 'p3', x: -220, z: -190, type: 'SWAT_VAN', status: 'ROADBLOCK' },
    ];
  }

  update(player, dt) {
    if (this.wantedLevel > 0) {
      this.units.forEach((u) => {
        const dx = player.x - u.x;
        const dz = player.z - u.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 15) {
          u.x += (dx / dist) * 22 * dt;
          u.z += (dz / dist) * 22 * dt;
        }
      });
    }
  }
}
