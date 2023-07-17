import * as THREE from 'three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2.5, 6);
  camera.rotation.x = -Math.PI / 60;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const loader = new GLTFLoader();
  let model;
  loader.load(
    'soldier.glb',
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(0, 0, 0);
      model.rotation.y = Math.PI;
      scene.add(model);
    },
    (progress) => {
      console.log('Loading soldier:', (progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Failed to load soldier:', error);
    }
  );

  let moveRight = false;
  let moveLeft = false;
  let jump = false;
  let jumping = false;
  let yVelocity = 0;

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
      moveRight = true;
    } else if (event.key === 'ArrowLeft') {
      moveLeft = true;
    } else if (event.key === 'ArrowUp') {
      if (!jumping) {
        jump = true;
        jumping = true;
        yVelocity = 0.2; // Initial jump velocity
      }
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'ArrowRight') {
      moveRight = false;
    } else if (event.key === 'ArrowLeft') {
      moveLeft = false;
    }
  }

  function updateCharacter() {
    const speed = 0.1;
    if (moveRight) {
      model.position.x += speed;
    }
    if (moveLeft) {
      model.position.x -= speed;
    }
    if (jump) {
      model.position.y += yVelocity;
      yVelocity -= 0.01; // Apply gravity
      if (model.position.y <= 0) {
        // Reached the ground level
        model.position.y = 0;
        jump = false;
        jumping = false;
        yVelocity = 0;
      }
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    updateCharacter();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();