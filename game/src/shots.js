// Caleta del Sol 3D — Camera Shots
export function applyShotQuery(world, query) {
  const params = new URLSearchParams(query);
  const shot = params.get('shot');

  if (shot === 'combat') {
    world.player.mode = 'ON_FOOT';
    world.player.selectedWeaponIndex = 2; // Carbine AR
    world.police.wantedLevel = 4;
    world.activeMission = world.missions[1];
    return { combatMode: true, titleMode: false, mapMode: false };
  } else if (shot === 'map') {
    return { combatMode: false, titleMode: false, mapMode: true };
  } else if (shot === 'title') {
    return { combatMode: false, titleMode: true, mapMode: false };
  } else {
    // default action
    world.player.mode = 'DRIVING';
    world.police.wantedLevel = 3;
    world.activeMission = world.missions[0];
    return { combatMode: false, titleMode: false, mapMode: false };
  }
}
