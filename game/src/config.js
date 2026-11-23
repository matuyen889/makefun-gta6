// CALETA DEL SOL 3D — Configuration & Specifications

export const GAME_TITLE = 'CALETA DEL SOL 3D';
export const GAME_SUBTITLE = 'VICE HORIZONS';

export const DISTRICTS = [
  { id: 'malecon', name: 'MALECÓN DEL SOL', subtitle: 'Ocean Boulevard & Golden Sands', standing: 'FRIENDLY', standingVal: 78, color: '#f59e0b' },
  { id: 'nocturno', name: 'DISTRITO NOCTURNO', subtitle: 'Downtown Neon & High-Rises', standing: 'NEUTRAL', standingVal: 52, color: '#ec4899' },
  { id: 'marina', name: 'DÁRSENA MARINA', subtitle: 'Luxury Yachts & Penthouse Piers', standing: 'FRIENDLY', standingVal: 84, color: '#3b82f6' },
  { id: 'muelle', name: 'MUELLE PESQUERO', subtitle: 'Industrial Port & Shipping Yards', standing: 'HOSTILE', standingVal: 24, color: '#ef4444' },
];

export const VEHICLES = {
  tormenta: {
    id: 'tormenta',
    name: 'TORMENTA GT',
    class: 'Sports Coupe',
    topSpeed: 185,
    accel: 28,
    handling: 1.2,
    mass: 1450,
    color: 0xff6600,
    secondaryColor: 0x111111,
    dentedPercent: 24,
  },
  vaquero: {
    id: 'vaquero',
    name: 'VAQUERO 440',
    class: 'Classic Muscle',
    topSpeed: 165,
    accel: 24,
    handling: 0.95,
    mass: 1750,
    color: 0x991b1b,
    secondaryColor: 0xffffff,
    dentedPercent: 42,
  },
  solstice: {
    id: 'solstice',
    name: 'SOLSTICE V12',
    class: 'Hypercar',
    topSpeed: 230,
    accel: 36,
    handling: 1.45,
    mass: 1320,
    color: 0x10b981,
    secondaryColor: 0x050505,
    dentedPercent: 12,
  },
  interceptor: {
    id: 'interceptor',
    name: 'MSPD INTERCEPTOR',
    class: 'Police Pursuit Cruiser',
    topSpeed: 175,
    accel: 26,
    handling: 1.15,
    mass: 1850,
    color: 0xffffff,
    secondaryColor: 0x0f172a,
    dentedPercent: 18,
  },
};

export const WEAPONS = [
  { id: 1, name: 'FISTS', slot: '1', ammo: '∞', maxAmmo: '∞', damage: 15, icon: '👊' },
  { id: 2, name: '.45 HEAVY', slot: '2', ammo: 8, maxAmmo: 48, damage: 45, icon: '🔫' },
  { id: 3, name: 'VIPER SMG', slot: '3', ammo: 30, maxAmmo: 180, damage: 28, icon: '⚡' },
  { id: 4, name: 'BREACHER 12G', slot: '4', ammo: 6, maxAmmo: 36, damage: 95, icon: '💥' },
  { id: 5, name: 'CARBINE AR-15', slot: '5', ammo: 30, maxAmmo: 90, damage: 52, icon: '🎯' },
];

export const RADIO_STATIONS = [
  { id: 'solfm', name: 'Sol FM 94.2', genre: 'Latin House & Tropical Grooves', track: 'Danza en la Costa' },
  { id: 'vicewave', name: 'Vice Wave 101.5', genre: 'Synthwave & Retrowave', track: 'Midnight Palms' },
  { id: 'caleta', name: 'Radio Caleta 88.9', genre: 'Island Hip-Hop & Bass', track: 'Fuego Urbano' },
];

export const MISSIONS = [
  {
    id: 1,
    num: 'OPERATION 1',
    title: 'BREAKOUT & SUNBREAK',
    stage: 'STAGE 2/3: EVADE HIGHWAY PATROL',
    objective: 'Lose the MSPD pursuit along Malecón del Sol',
    next: 'Reach Sofia’s Safehouse',
    dialogue: 'SOFIA: Drop the heat along the coastline! Don’t let them box you into the seawall!',
  },
  {
    id: 2,
    num: 'OPERATION 2',
    title: 'DOCKS INFILTRATION',
    stage: 'STAGE 1/2: BREACH CRANE YARD',
    objective: 'Locate the contraband shipping manifests at Muelle Pesquero',
    next: 'Secure the Cargo Van',
    dialogue: 'JAX: The guards are rotating near crane 4. Keep low behind the containers.',
  },
  {
    id: 3,
    num: 'OPERATION 3',
    title: 'NEON BAZAAR AMBUSH',
    stage: 'STAGE 2/3: CLEAR THE AISLES',
    objective: 'Neutralize Los Cuervos syndicate shooters in the night market',
    next: 'Extract through the alleyways',
    dialogue: 'MATEO: Two shooters flanking behind the fruit stalls! Take the high ground!',
  },
  {
    id: 4,
    num: 'OPERATION 4',
    title: 'OCEANVIEW VAULT',
    stage: 'STAGE 3/4: THERMAL CRACK',
    objective: 'Protect the safe drill until the titanium barrier yields',
    next: 'Escape via Underground Aqueduct',
    dialogue: 'SOFIA: 45 seconds on the drill! Tactical units entering through the lobby!',
  },
  {
    id: 5,
    num: 'OPERATION 5',
    title: 'HIGHWAY TAKEDOWN',
    stage: 'STAGE 2/3: RAM THE REGENT',
    objective: 'Wreck the cartel convoy before it reaches Kumala Bridge',
    next: 'Intercept Escort Helicopter',
    dialogue: 'MATEO: Ram the lead transport into the median! Condor-1 is inbound on our six!',
  },
  {
    id: 6,
    num: 'OPERATION 6',
    title: 'MARINA INFILTRATION',
    stage: 'STAGE 1/3: SPEEDBOAT ASSAULT',
    objective: 'Board the syndicate mega-yacht moored off Dársena Marina',
    next: 'Secure the Offshore Ledger',
    dialogue: 'MAYA: Approaching starboard side. Cut engines and drift under the radar cone.',
  },
  {
    id: 7,
    num: 'OPERATION 7',
    title: '5-STAR SIEGE',
    stage: 'STAGE 3/4: EVADE CONDOR-1 AIR UNIT',
    objective: 'Break line-of-sight from the searchlight helicopter across downtown',
    next: 'Disguise Vehicle at Pay & Spray',
    dialogue: 'DISPATCH: All units, suspect spotted northbound on Strand Blvd. Air One has visual.',
  },
  {
    id: 8,
    num: 'OPERATION 8',
    title: 'SUNSET SYNDICATE',
    stage: 'STAGE 4/4: PENTHOUSE CLIMAX',
    objective: 'Confront Kingpin Don Valerio on the rooftop helipad',
    next: 'Final Extraction',
    dialogue: 'VALERIO: You think Caleta del Sol is yours? This city burns with us!',
  },
];

export const CREW_ABILITIES = [
  { key: 'Z', title: 'SWAP PLATES', member: 'Sofia · Driver', desc: 'Instantly drop 2 wanted stars in alleys' },
  { key: 'X', title: 'QUICK FIX', member: 'Jax · Mechanic', desc: 'Repair 40% vehicle body & tires' },
  { key: 'C', title: 'RADAR SWEEP', member: 'Maya · Hacker', desc: 'Reveal police cones & roadblocks for 30s' },
];

export const CAREER_STATS = {
  carsStolen: 44,
  copsEscaped: 15,
  highestWanted: 5,
  distanceDrivenKm: 56.8,
  peopleTakenOut: 32,
  longestJumpM: 52,
  crewAbilitiesUsed: 41,
  safehousesUnlocked: 4,
  completionRate: 68.4,
};
