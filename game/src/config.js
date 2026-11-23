// Caleta del Sol 3D — Configuration & World Constants
export const DISTRICTS = [
  { id: 'downtown', name: 'Downtown District', color: '#38bdf8', minX: -500, maxX: 0, minZ: -500, maxZ: 0 },
  { id: 'marina', name: 'Ocean Drive Marina', color: '#06b6d4', minX: 0, maxX: 500, minZ: -500, maxZ: 0 },
  { id: 'southbeach', name: 'South Beach Promenade', color: '#f43f5e', minX: -500, maxX: 0, minZ: 0, maxZ: 500 },
  { id: 'viceport', name: 'Industrial Vice Port', color: '#f59e0b', minX: 0, maxX: 500, minZ: 0, maxZ: 500 },
];

export const WEAPONS = [
  { id: 'pistol', name: 'Pistol .45', slot: '1', damage: 25, fireRate: 350, ammo: 48, maxAmmo: 120, range: 60 },
  { id: 'smg', name: 'Micro SMG', slot: '2', damage: 18, fireRate: 120, ammo: 90, maxAmmo: 300, range: 50 },
  { id: 'ar', name: 'Carbine AR', slot: '3', damage: 32, fireRate: 180, ammo: 120, maxAmmo: 360, range: 100 },
  { id: 'shotgun', name: 'Combat Shotgun', slot: '4', damage: 75, fireRate: 700, ammo: 24, maxAmmo: 64, range: 30 },
];

export const CREW_ABILITIES = [
  { key: 'Q', title: 'HACK GRID', member: 'LUCIA T.', desc: 'Disable traffic signals & surveillance' },
  { key: 'F', title: 'ADRENALINE', member: 'JASON R.', desc: 'Slow motion precision shooting' },
  { key: 'V', title: 'SUPPLY DROP', member: 'CARLOS M.', desc: 'Armor & ammo replenishment' },
];

export const VEHICLE_MODELS = [
  { id: 'banshee', name: 'Banshee V8', color: '#e11d48', topSpeed: 140, accel: 25, handling: 0.85 },
  { id: 'stallion', name: 'Stallion Turbo', color: '#2563eb', topSpeed: 125, accel: 20, handling: 0.80 },
  { id: 'cheetah', name: 'Cheetah GTS', color: '#f59e0b', topSpeed: 160, accel: 32, handling: 0.90 },
  { id: 'cruiser', name: 'MSPD Cruiser', color: '#0f172a', topSpeed: 135, accel: 24, handling: 0.82 },
];

export const STORY_MISSIONS = [
  {
    id: 'm1',
    num: 'MISSION 01',
    title: 'THE CALETA PAYLOAD',
    stage: 'STAGE 2/3: SECURE EXTRACTION',
    objective: 'Steal the armored courier vehicle and evade MSPD tactical units',
    next: 'DELIVER COURIER TO VICE PORT SAFE HOUSE',
    dialogue: 'SOFIA VEGA: MSPD has locked down Ocean Drive! Take the coastal alleyways and lose the tail!',
  },
  {
    id: 'm2',
    num: 'MISSION 02',
    title: 'MARINA HEIST SYNDICATE',
    stage: 'STAGE 1/3: BREACH VAULT',
    objective: 'Hack the security terminal and collect uncut diamonds',
    next: 'REGROUP WITH JASON AT THE DOCKS',
    dialogue: 'MATEO CRUZ: Grid offline in 30 seconds! Move fast before SWAT mobilizes!',
  },
];
