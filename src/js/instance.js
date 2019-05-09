import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";

class Instance {
  constructor(url, numInstances = 100) {
    this.numInstances = numInstances;
    for (let i = 0; i < numInstances; i++) {
      this.loadMesh(url);
    }
    engine3d.on("update", () => this.onUpdate());
  }

  loadMesh(url) {
    const loader = new GLTFLoader();
    loader.load(url, gltf => {
      const mesh = gltf.scene;
      this.tracks = gltf.animations[0].tracks;
      mesh.traverse(o => {
        if (!(o instanceof THREE.SkinnedMesh)) return;
        this.instanciate(o);
      });
      scene.add(mesh);
      scene.position.set(4 * Math.random(), 0, 4 * Math.random());
      this.mixer = new THREE.AnimationMixer(mesh);
      const action = this.mixer.clipAction(gltf.animations[0]);
      action.play();
    });
  }

  onUpdate() {
    if (this.mixer) {
      this.mixer.update(1 / 60);
    }
  }

  instanciate(skinnedMesh) {
    const geometry =
      skinnedMesh.geometry instanceof THREE.BufferGeometry
        ? new THREE.InstancedBufferGeometry().copy(skinnedMesh.geometry)
        : new THREE.InstancedBufferGeometry().fromDirectGeometry(
            skinnedMesh.geometry
          );
    geometry.maxInstancedCount = this.numInstances;

    const positionsArray = new Float32Array(3 * this.numInstances)
      .fill(0)
      // choose random positions
      .map((e, i) => (i % 3 === 2 ? 0 : Math.random() * 10 - 5));

    const scalesArray = new Float32Array(3 * this.numInstances)
      .fill(0)
      // choose random scales
      .map((e, i) => Math.random() + 1);

    const rotationsArray = new Float32Array(4 * this.numInstances).fill(0);
    // choose random rotations
    for (let i = 0; i < this.numInstances; i++) {
      const quat = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        2 * Math.PI * Math.random()
      );
      quat.toArray(rotationsArray, i * 4);
    }

    // add attributes to the instance
    geometry.addAttribute(
      "positions",
      new THREE.InstancedBufferAttribute(positionsArray, 3, false)
    );

    geometry.addAttribute(
      "scales",
      new THREE.InstancedBufferAttribute(scalesArray, 3, false)
    );

    geometry.addAttribute(
      "rotations",
      new THREE.InstancedBufferAttribute(rotationsArray, 4, false)
    );

    // declare the attributes in the shader
    // and add a helper for quaternion rotation
    const material = skinnedMesh.material.clone();
    THREE.ShaderChunk.animated_instance_pars_vertex = `
      attribute vec3 positions;
      attribute vec3 scales;
      attribute vec4 rotations;

      vec3 qtransform( vec4 q, vec3 v ){
       return v + 2.0*cross(cross(v, q.xyz ) + q.w*v, q.xyz);
      }

    `;

    // compute the mesh position/rotation/scale
    THREE.ShaderChunk.begin_animated_instance = `
    transformed = qtransform(rotations, transformed * scales) + positions;
    `;

    // modify the shader to take account of the attributes
    material.onBeforeCompile = shader => {
      shader.uniforms.time = { value: 0 };
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `
          #include <common>
          #include <animated_instance_pars_vertex>
          `
        )
        .replace(
          "#include <project_vertex>",
          `
          #include <begin_animated_instance>
          #include <project_vertex>
        `
        );
    };
    // dispose the unused geometry and material
    skinnedMesh.material.dispose();
    skinnedMesh.geometry.dispose();

    // assign the new geometry and material
    skinnedMesh.material = material;
    skinnedMesh.geometry = geometry;
  }
}

export default Instance;
