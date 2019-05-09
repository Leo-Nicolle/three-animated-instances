import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
const OrbitControls = require("three-orbitcontrols");
const EventEmitter = require("events");

window.THREE = THREE;
class Engine3d extends EventEmitter {
  constructor(canvas) {
    super();
    this.init(canvas);
  }

  init(canvas) {
    this.camera = new THREE.PerspectiveCamera(
      27,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(14, 14, 14);
    this.scene = new THREE.Scene();

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(50, 50, 50);
    this.scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(-50, 50, -50);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.controls = new OrbitControls(this.camera, canvas);

    window.addEventListener("resize", () => this.onWindowResize(), false);
    window.scene = this.scene;
    window.instance = this;
    window.scene = this.scene;
    window.engine3d = this;
    this.update(Date.now());
  }

  update(timestamp) {
    requestAnimationFrame(() => this.update());
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    this.emit("update");
  }

  onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

export default Engine3d;
