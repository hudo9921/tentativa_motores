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

  const ambientLight = new THREE.AmbientLight(0x1a1a33, 0.8);
  scene.add(ambientLight);

  const moonLight = new THREE.PointLight(0xfddddd, 0.03);
  moonLight.position.set(5, 10, -20);
  scene.add(moonLight);

  const highlightLight = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight.position.set(-3, 2.3, -12.8);
  highlightLight.target.position.set(-3, 1, -12.8);
  highlightLight.angle = Math.PI / 3;
  scene.add(highlightLight);
  scene.add(highlightLight.target);

  const highlightLight2 = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight2.position.set(-4, 2.4, -32);
  highlightLight2.target.position.set(-4, 1, -32);
  highlightLight2.angle = Math.PI / 3;
  scene.add(highlightLight2);
  scene.add(highlightLight2.target);

  const highlightLight3 = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight3.position.set(-3, 8, -54);
  highlightLight3.target.position.set(-3, 5, -54);
  highlightLight3.angle = Math.PI / 4;
  scene.add(highlightLight3);
  scene.add(highlightLight3.target);

  const highlightLight4 = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight4.position.set(-3, 2.3, -81);
  highlightLight4.target.position.set(-3, 1, -81);
  highlightLight4.angle = Math.PI / 3;
  scene.add(highlightLight4);
  scene.add(highlightLight4.target);

  const highlightLight5 = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight5.position.set(-4, 2.4, -100);
  highlightLight5.target.position.set(-4, 1, -100);
  highlightLight5.angle = Math.PI / 3;
  scene.add(highlightLight5);
  scene.add(highlightLight5.target);

  const highlightLight6 = new THREE.SpotLight(0x8c6d19, 0.5);
  highlightLight6.position.set(-3, 8, -122);
  highlightLight6.target.position.set(-3, 5, -122);
  highlightLight6.angle = Math.PI / 4;
  scene.add(highlightLight6);
  scene.add(highlightLight6.target);

  const floorGeometry = new THREE.PlaneGeometry(100, 1000);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -2.8;
  scene.add(floorMesh);

  const loader = new GLTFLoader();
  const loader2 = new GLTFLoader();
  let model;
  loader.load(
    'soldado.glb',
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.8, 0.8, 0.8);
      model.position.set(0, 0, 0);
      model.rotation.y = Math.PI;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);
    },
    (progress) => {
      console.log('Loading soldier:', (progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Failed to load soldier:', error);
    }
  );
  let street;
  let highlightLightsGroup = new THREE.Group();
  loader2.load(
    'rua.glb',
    (gltf) => {
      street = gltf.scene;
      street.scale.set(1, 1, 1);
      street.position.set(4, 2, -28);
      street.rotation.y = 114 * (Math.PI / 180);
      street.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    
    highlightLightsGroup.add(street);
    highlightLightsGroup.add(highlightLight);
    highlightLightsGroup.add(highlightLight2);
    highlightLightsGroup.add(highlightLight3);

    scene.add(highlightLightsGroup);

    },
    (progress) => {
      console.log('Loading street:', (progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Failed to load street:', error);
    }
  );

  let street2;
  let highlightLightsGroup2 = new THREE.Group();
  loader2.load(
    'rua.glb',
    (gltf) => {
      street2 = gltf.scene;
      street2.scale.set(1, 1, 1);
      street2.position.set(4, 2, -96.5);
      street2.rotation.y = 114 * (Math.PI / 180);
      street2.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    highlightLightsGroup2.add(street2);
    highlightLightsGroup.add(highlightLight4);
    highlightLightsGroup.add(highlightLight5);
    highlightLightsGroup.add(highlightLight6);

    scene.add(highlightLightsGroup2);
    },
    (progress) => {
      console.log('Loading street2:', (progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Failed to load street2:', error);
    }
  );

  // Sombra
  renderer.shadowMap.enabled = true;

  highlightLight.castShadow = true;
  highlightLight.shadow.mapSize.width = 1024;
  highlightLight.shadow.mapSize.height = 1024;

  highlightLight2.castShadow = true;
  highlightLight2.shadow.mapSize.width = 1024;
  highlightLight2.shadow.mapSize.height = 1024;

  highlightLight3.castShadow = true;
  highlightLight3.shadow.mapSize.width = 1024;
  highlightLight3.shadow.mapSize.height = 1024;
  
  highlightLight4.castShadow = true;
  highlightLight4.shadow.mapSize.width = 1024;
  highlightLight4.shadow.mapSize.height = 1024;

  highlightLight5.castShadow = true;
  highlightLight5.shadow.mapSize.width = 1024;
  highlightLight5.shadow.mapSize.height = 1024;

  highlightLight6.castShadow = true;
  highlightLight6.shadow.mapSize.width = 1024;
  highlightLight6.shadow.mapSize.height = 1024;

  moonLight.castShadow = true;
  moonLight.shadow.mapSize.width = 1024;
  moonLight.shadow.mapSize.height = 1024;

  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //FUNCAO
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
        yVelocity = 0.12;
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

 function updateHighlightTargets() {
  if (highlightLightsGroup) {
    highlightLight.target.position.copy(highlightLightsGroup.position).add(new THREE.Vector3(-3, 1, -12.8));
    highlightLight2.target.position.copy(highlightLightsGroup.position).add(new THREE.Vector3(-4, 1, -32));
    highlightLight3.target.position.copy(highlightLightsGroup.position).add(new THREE.Vector3(-3, 5, -54));
  }
}
function updateHighlightTargets2() {
  if (highlightLightsGroup2) {
    highlightLight4.target.position.copy(highlightLightsGroup2.position).add(new THREE.Vector3(-3, 1, -81));
    highlightLight5.target.position.copy(highlightLightsGroup2.position).add(new THREE.Vector3(-4, 1, -100));
    highlightLight6.target.position.copy(highlightLightsGroup2.position).add(new THREE.Vector3(-3, 5, -122));
  }
}

function updateHighlightGroups() {
  const highlightGroupSpeed = 0.1;
  highlightLightsGroup.position.z += highlightGroupSpeed;
  highlightLightsGroup2.position.z += highlightGroupSpeed;

  updateHighlightTargets();
  updateHighlightTargets2();
}
  function updateCharacter() {
    const speed = 0.1;
    if (moveRight) {
     model.position.z += speed;
     camera.position.z += speed;
	 console.log('Personagem Z',model.position.z);
	 console.log('grupo Z',highlightLightsGroup.position.z,'rua z',street.position.z);
	 console.log('grupo2 Z',highlightLightsGroup2.position.z,'rua 2 z',street2.position.z);
    }
    if (moveLeft) {
      model.position.z -= speed;
      camera.position.z -= speed;
	 console.log('Personagem Z',model.position.z);
	 console.log('RUA Z',highlightLightsGroup.position.z);
	 console.log('RUA2 Z',highlightLightsGroup2.position.z);
    }
    if (jump) {
      model.position.y += yVelocity;
      yVelocity -= 0.01; 
      if (model.position.y <= 0) {
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
	//updateHighlightGroups();
	

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
