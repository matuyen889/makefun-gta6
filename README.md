# Caleta del Sol 3D — GTA 6 Style Open-World Game (v1.0.4)

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/matuyen889/makefun-gta6/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/matuyen889/makefun-gta6/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

Caleta del Sol 3D is a complete, original browser-based 3D open-world crime action game built for make.fun's `gta6-01` competition. Engineered with pure client-side WebGL (Three.js) and 60 FPS Canvas HUD overlay.

## Game Features
- **3D Urban Environment**: Multi-district metropolis including Downtown skyscrapers, Ocean Drive Marina, South Beach promenade, and Industrial Vice Port.
- **Vehicles & On-Foot Mobility**: Smooth player locomotion, vehicle hijacking, realistic arcade physics, drifting, and nitro.
- **Dynamic Law Enforcement**: MSPD tactical response system featuring wanted levels (1 to 5 stars), police cruisers, spike strips, roadblocks, and tactical SWAT containment.
- **Weapon Arsenal**: Weapons inventory including Combat Pistol, Micro SMG, Assault Rifle, and Tactical Shotgun.
- **Heist & Story Missions**: Multi-stage heist campaign with narrative dialogue, cash payouts, and crew coordination.
- **Authentic GTA 6 Style HUD**: Radar minimap with real-time GPS blips, player vitals, wanted star indicators, currency counter, and speedometer.
- **Pure Client-Side**: 100% static files with zero external network calls or trackers, playable offline.

## Controls
- **W / A / S / D**: Move on foot / Steer vehicle
- **Mouse / Pointer**: Look around / Aim
- **Left Mouse Click**: Fire weapon / Attack
- **Right Mouse Click**: Aim down sights
- **Space**: Jump on foot / Handbrake in vehicle
- **Shift**: Sprint / Turbo acceleration
- **E / Enter**: Enter or exit vehicle
- **1 - 4**: Select weapon
- **R**: Reload weapon
- **M**: Toggle full district map
- **Esc**: Pause menu / Save game

## Architecture
- `main.ts`: Deliverable packager and judge dossier builder (Node.js 22).
- `game/`: Web application with HTML5 Canvas and Three.js 3D engine.
- `vendor/makefun-game.ts`: Competition referee and dossier generator.

## License
MIT License. All assets, story, and code are 100% original.
