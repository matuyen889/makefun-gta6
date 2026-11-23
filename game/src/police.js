// MSPD Police System & Dispatch Tactics (1 to 5 Stars)

export class PoliceSystem {
  constructor() {
    this.wantedLevel = 0;
    this.heatTime = 0;
    this.activeUnits = [];
    this.airUnitActive = false;
    this.roadblocks = [];
  }

  setWanted(level) {
    this.wantedLevel = Math.max(0, Math.min(5, level));
    this.updateDispatchUnits();
  }

  updateDispatchUnits() {
    this.activeUnits = [];
    if (this.wantedLevel === 0) return;

    if (this.wantedLevel >= 4) {
      this.airUnitActive = true;
      this.activeUnits.push({
        callsign: 'CONDOR-1',
        type: 'AIR SUPPORT',
        tactic: 'SEARCHLIGHT & SNIPER',
        distance: 18,
        icon: '🚁',
      });
    } else {
      this.airUnitActive = false;
    }

    if (this.wantedLevel >= 3) {
      this.activeUnits.push(
        { callsign: 'HUNTER-4', type: 'SWAT RAM UNIT', tactic: 'PIT MANEUVER', distance: 8, icon: '🚔' },
        { callsign: 'SHORE-2', type: 'CRUISER', tactic: 'ROADBLOCK', distance: 135, icon: '🚧' },
      );
    }

    if (this.wantedLevel >= 2) {
      this.activeUnits.push(
        { callsign: 'CORAL-48', type: 'PURSUIT INTERCEPTOR', tactic: 'RAMMING', distance: 12, icon: '🚔' },
        { callsign: 'CORAL-85', type: 'PURSUIT INTERCEPTOR', tactic: 'FLANKING', distance: 22, icon: '🚔' },
      );
    }

    if (this.wantedLevel >= 1) {
      this.activeUnits.push({
        callsign: 'KITE-1',
        type: 'BEACH PATROL',
        tactic: 'FOOT PURSUIT',
        distance: 35,
        icon: '👮',
      });
    }
  }

  getDispatchSummary() {
    return {
      wantedLevel: this.wantedLevel,
      totalUnits: this.activeUnits.length,
      airSupport: this.airUnitActive,
      units: this.activeUnits,
      dispatchCall: this.getDispatchRadioLine(),
    };
  }

  getDispatchRadioLine() {
    switch (this.wantedLevel) {
      case 5:
        return 'DISPATCH: All district units code 3! Condor-1 has eyes on suspect vehicle, authorize lethal pit!';
      case 4:
        return 'DISPATCH: Tactical Air Patrol deploying searchlight along Strand Boulevard!';
      case 3:
        return 'DISPATCH: Set up roadblock at Palm Crossing! Deploy spike strips on the northbound lanes!';
      case 2:
        return 'DISPATCH: Unit Coral-48 in visual pursuit of orange sports coupe at high speed.';
      case 1:
        return 'DISPATCH: Civilian report of reckless driving and disturbance near Kumala Strand.';
      default:
        return 'DISPATCH: All channels clear. Routine patrol on Malecón del Sol.';
    }
  }
}
