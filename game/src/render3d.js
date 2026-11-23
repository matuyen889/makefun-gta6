// Three.js 3D WebGL Scene & Graphics Pipeline

/* global THREE */

export class Render3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.playerCar = null;
    this.policeHelicopter = null;
    this.policeCars = [];
    this.streetLights = [];
    this.flashingLights = [];
    this.rotorBlade = null;
    this.searchlight = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    const width = this.canvas.clientWidth || 1280;
    const height = this.canvas.clientHeight || 720;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfb923c);
    this.scene.fog = new THREE.FogExp2(0xf97316, 0.0055);

    this.camera = new THREE.PerspectiveCamera(58, width / height, 0.5, 800);
    this.initLights();
    this.initEnvironment();
    this.initialized = true;
  }

  initLights() {
    const hemiLight = new THREE.HemisphereLight(0xfed7aa, 0x0369a1, 0.9);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    sunLight.position.set(120, 45, -150);
    this.scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 0.7);
    rimLight.position.set(-90, 30, 80);
    this.scene.add(rimLight);
  }

  initEnvironment() {
    const oceanGeo = new THREE.PlaneGeometry(600, 800);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.15,
      metalness: 0.85,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.set(-160, -0.4, 0);
    this.scene.add(ocean);

    const beachGeo = new THREE.PlaneGeometry(60, 800);
    const beachMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.9,
      metalness: 0.05,
    });
    const beach = new THREE.Mesh(beachGeo, beachMat);
    beach.rotation.x = -Math.PI / 2;
    beach.position.set(15, -0.2, 0);
    this.scene.add(beach);

    const roadGeo = new THREE.PlaneGeometry(24, 800);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, 0);
    this.scene.add(road);

    const lineGeo = new THREE.PlaneGeometry(0.35, 800);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const line1 = new THREE.Mesh(lineGeo, lineMat);
    line1.rotation.x = -Math.PI / 2;
    line1.position.set(-0.3, 0.02, 0);
    this.scene.add(line1);

    const line2 = new THREE.Mesh(lineGeo, lineMat);
    line2.rotation.x = -Math.PI / 2;
    line2.position.set(0.3, 0.02, 0);
    this.scene.add(line2);

    const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
    const walkLeft = new THREE.Mesh(new THREE.BoxGeometry(3, 0.3, 800), sidewalkMat);
    walkLeft.position.set(-13.5, 0.15, 0);
    this.scene.add(walkLeft);

    const walkRight = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, 800), sidewalkMat);
    walkRight.position.set(14, 0.15, 0);
    this.scene.add(walkRight);

    this.buildCitySkyline();
    this.buildPalmTrees();
  }

  buildCitySkyline() {
    const buildingColors = [0xe2e8f0, 0xfef08a, 0xfce7f3, 0xdbeafe, 0xf1f5f9];
    const neonColors = [0xec4899, 0x06b6d4, 0xa855f7, 0xf59e0b];

    for (let i = 0; i < 28; i++) {
      const height = 28 + (i % 6) * 14;
      const width = 18 + (i % 3) * 4;
      const depth = 22 + (i % 4) * 3;
      const x = 32 + (i % 2 === 0 ? 0 : 26);
      const z = -320 + i * 24;

      const geo = new THREE.BoxGeometry(width, height, depth);
      const mat = new THREE.MeshStandardMaterial({
        color: buildingColors[i % buildingColors.length],
        roughness: 0.6,
      });
      const building = new THREE.Mesh(geo, mat);
      building.position.set(x, height / 2, z);
      this.scene.add(building);

      const signGeo = new THREE.BoxGeometry(width * 0.75, 2.2, 0.6);
      const signMat = new THREE.MeshStandardMaterial({
        color: neonColors[i % neonColors.length],
        emissive: neonColors[i % neonColors.length],
        emissiveIntensity: 0.85,
      });
      const sign = new THREE.Mesh(signGeo, signMat);
      sign.position.set(x - width / 2 - 0.2, height * 0.6, z);
      sign.rotation.y = Math.PI / 2;
      this.scene.add(sign);
    }
  }

  buildPalmTrees() {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const frondMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 });

    for (let i = 0; i < 32; i++) {
      const z = -320 + i * 20;
      const x = 13 + (i % 2 === 0 ? -1.2 : 1.2);
      const height = 8 + (i % 3) * 1.5;

      const group = new THREE.Group();
      group.position.set(x, 0, z);

      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, height, 8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = height / 2;
      trunk.rotation.z = (i % 2 === 0 ? 0.08 : -0.08);
      group.add(trunk);

      for (let f = 0; f < 8; f++) {
        const frondGeo = new THREE.ConeGeometry(1.6, 4.5, 4);
        const frond = new THREE.Mesh(frondGeo, frondMat);
        frond.position.set(0, height, 0);
        frond.rotation.z = Math.PI / 3;
        frond.rotation.y = (f * Math.PI) / 4;
        group.add(frond);
      }
      this.scene.add(group);
    }
  }

  createSportsCar(colorHex = 0xff6600) {
    const car = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(2.4, 0.8, 5.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      metalness: 0.8,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.65;
    car.add(body);

    const cabinGeo = new THREE.BoxGeometry(1.9, 0.65, 2.6);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.1,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 1.25, -0.3);
    car.add(cabin);

    const wingGeo = new THREE.BoxGeometry(2.2, 0.1, 0.5);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const wing = new THREE.Mesh(wingGeo, wingMat);
    wing.position.set(0, 1.3, 2.2);
    car.add(wing);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.45, 16);
    const wheelPositions = [
      [-1.25, 0.48, -1.6],
      [1.25, 0.48, -1.6],
      [-1.25, 0.48, 1.6],
      [1.25, 0.48, 1.6],
    ];
    for (const pos of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      car.add(wheel);
    }

    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.1), tailMat);
    tailL.position.set(-0.8, 0.7, 2.62);
    car.add(tailL);

    const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.1), tailMat);
    tailR.position.set(0.8, 0.7, 2.62);
    car.add(tailR);

    return car;
  }

  createPoliceCruiser() {
    const cruiser = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(2.4, 0.9, 5.4);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.6, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.7;
    cruiser.add(body);

    const cabinGeo = new THREE.BoxGeometry(2.0, 0.75, 2.8);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 1.4, -0.2);
    cruiser.add(cabin);

    const barGeo = new THREE.BoxGeometry(1.4, 0.22, 0.4);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(0, 1.9, -0.2);
    cruiser.add(bar);

    const redLight = new THREE.PointLight(0xef4444, 3.5, 25);
    redLight.position.set(-0.5, 2.1, -0.2);
    cruiser.add(redLight);
    this.flashingLights.push(redLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3.5, 25);
    blueLight.position.set(0.5, 2.1, -0.2);
    cruiser.add(blueLight);
    this.flashingLights.push(blueLight);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.45, 16);
    for (const [x, y, z] of [[-1.25, 0.48, -1.6], [1.25, 0.48, -1.6], [-1.25, 0.48, 1.6], [1.25, 0.48, 1.6]]) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      cruiser.add(wheel);
    }

    return cruiser;
  }

  createPoliceHelicopter() {
    const heli = new THREE.Group();

    const fuseGeo = new THREE.SphereGeometry(1.8, 16, 16);
    fuseGeo.scale(1.2, 1.0, 2.2);
    const fuseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
    const fuselage = new THREE.Mesh(fuseGeo, fuseMat);
    heli.add(fuselage);

    const tailGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 8);
    const tail = new THREE.Mesh(tailGeo, fuseMat);
    tail.rotation.x = Math.PI / 2;
    tail.position.set(0, 0.3, 4.2);
    heli.add(tail);

    const rotorGeo = new THREE.BoxGeometry(0.35, 0.08, 10);
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    this.rotorBlade = new THREE.Mesh(rotorGeo, rotorMat);
    this.rotorBlade.position.set(0, 1.8, 0);
    heli.add(this.rotorBlade);

    const searchLight = new THREE.SpotLight(0xffffff, 5.0, 80, Math.PI / 6, 0.5);
    searchLight.position.set(0, -1.2, -1.0);
    searchLight.target.position.set(0, -25, -15);
    heli.add(searchLight);
    heli.add(searchLight.target);
    this.searchlight = searchLight;

    return heli;
  }

  setupActionChaseScene() {
    this.init();

    this.playerCar = this.createSportsCar(0xff6600);
    this.playerCar.position.set(2.2, 0, 0);
    this.scene.add(this.playerCar);

    const cop1 = this.createPoliceCruiser();
    cop1.position.set(-4.0, 0, 18);
    this.scene.add(cop1);
    this.policeCars.push(cop1);

    const cop2 = this.createPoliceCruiser();
    cop2.position.set(3.8, 0, 32);
    this.scene.add(cop2);
    this.policeCars.push(cop2);

    this.policeHelicopter = this.createPoliceHelicopter();
    this.policeHelicopter.position.set(1.5, 19, -8);
    this.policeHelicopter.rotation.x = 0.15;
    this.scene.add(this.policeHelicopter);

    this.camera.position.set(2.2, 3.4, -9.2);
    this.camera.lookAt(2.2, 1.4, 25);
  }

  setupShootoutScene() {
    this.init();
    this.scene.background = new THREE.Color(0x0f172a);
    this.scene.fog = new THREE.FogExp2(0x1e1b4b, 0.008);

    const stallColors = [0xef4444, 0x3b82f6, 0xf59e0b, 0x10b981, 0xec4899];
    for (let i = 0; i < 16; i++) {
      const z = -40 + (i % 8) * 12;
      const x = i < 8 ? -7 : 7;
      const stall = new THREE.Group();
      stall.position.set(x, 0, z);

      const counter = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.1, 2.2), new THREE.MeshStandardMaterial({ color: 0x78350f }));
      counter.position.y = 0.55;
      stall.add(counter);

      const awning = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.2, 2.6), new THREE.MeshStandardMaterial({ color: stallColors[i % stallColors.length] }));
      awning.position.y = 2.4;
      stall.add(awning);

      const lantern = new THREE.PointLight(stallColors[i % stallColors.length], 2.2, 14);
      lantern.position.y = 2.2;
      stall.add(lantern);

      this.scene.add(stall);
    }

    const playerChar = new THREE.Group();
    playerChar.position.set(0, 0, 0);

    const legs = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.0, 0.4), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    legs.position.y = 0.5;
    playerChar.add(legs);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.5), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    torso.position.y = 1.35;
    playerChar.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), new THREE.MeshStandardMaterial({ color: 0xd4a373 }));
    head.position.y = 2.0;
    playerChar.add(head);

    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 1.1), new THREE.MeshStandardMaterial({ color: 0x09090b }));
    gun.position.set(0.35, 1.5, 0.7);
    playerChar.add(gun);

    const flash = new THREE.PointLight(0xfacc15, 6.0, 12);
    flash.position.set(0.35, 1.5, 1.4);
    playerChar.add(flash);

    this.scene.add(playerChar);

    const fallen = new THREE.Group();
    fallen.position.set(-1.8, 0.15, 12);
    fallen.rotation.y = Math.PI / 4;
    const fallenBody = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 1.6), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    fallen.add(fallenBody);
    this.scene.add(fallen);

    this.camera.position.set(0.6, 1.9, -2.8);
    this.camera.lookAt(0.2, 1.5, 20);
  }

  setupSkylineTitleScene() {
    this.init();
    this.scene.background = new THREE.Color(0xf97316);
    this.scene.fog = new THREE.FogExp2(0xfb923c, 0.0035);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(18, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    sun.position.set(80, 25, 280);
    this.scene.add(sun);

    this.camera.position.set(-45, 28, -60);
    this.camera.lookAt(35, 12, 120);
  }

  render() {
    if (!this.renderer || !this.scene || !this.camera) return;
    if (this.rotorBlade) this.rotorBlade.rotation.y += 0.35;
    this.renderer.render(this.scene, this.camera);
  }
}
