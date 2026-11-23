// Caleta del Sol 3D — Three.js 3D Open World Renderer
export class ThreeRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.carMesh = null;
    this.playerMesh = null;
    this.buildingMeshes = [];
    this.initThree();
  }

  initThree() {
    if (typeof THREE === 'undefined') return;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090d16);
    this.scene.fog = new THREE.FogExp2(0x090d16, 0.0035);

    const width = this.canvas.clientWidth || 1280;
    const height = this.canvas.clientHeight || 720;
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const hemi = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.8);
    this.scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dir.position.set(100, 150, 80);
    this.scene.add(dir);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(1200, 1200);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1d, roughness: 0.85 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
  }

  setupScene(world) {
    if (!this.scene) return;

    // Build city blocks
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    world.buildings.forEach((b) => {
      const mat = new THREE.MeshStandardMaterial({
        color: b.color === '#1e293b' ? 0x1e293b : 0x0f172a,
        roughness: 0.5,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.scale.set(b.w, b.h, b.d);
      mesh.position.set(b.x, b.h / 2, b.z);
      this.scene.add(mesh);
      this.buildingMeshes.push(mesh);
    });

    // Player Vehicle
    const carGeo = new THREE.BoxGeometry(4.5, 1.6, 9.5);
    const carMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.8, roughness: 0.2 });
    this.carMesh = new THREE.Mesh(carGeo, carMat);
    this.scene.add(this.carMesh);
  }

  render(world, options = {}) {
    if (!this.renderer || !this.scene || !this.camera) return;

    const p = world.player;
    if (this.carMesh) {
      this.carMesh.position.set(p.x, 0.8, p.z);
      this.carMesh.rotation.y = p.rotation;
    }

    if (options.combatMode) {
      // Over the shoulder combat camera
      const camOffset = new THREE.Vector3(1.2, 2.2, -4.5);
      camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), p.rotation);
      this.camera.position.set(p.x + camOffset.x, camOffset.y, p.z + camOffset.z);
      this.camera.lookAt(p.x, 1.8, p.z + 12);
    } else {
      // Third person driving chase camera
      const camOffset = new THREE.Vector3(0, 5.5, -14);
      camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), p.rotation);
      this.camera.position.set(p.x + camOffset.x, camOffset.y, p.z + camOffset.z);
      this.camera.lookAt(p.x, 2, p.z + 8);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
