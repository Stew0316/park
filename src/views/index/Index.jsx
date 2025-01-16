
import * as THREE from 'three';
import Styles from '@/style/Index.module.scss';
import { useEffect } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import testMod from "../../mod/tree.fbx";
function init() {
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const canvas = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  const wireframeGeometry = new THREE.WireframeGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
  scene.add(wireframe);
  camera.position.z = 15;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  const light = new THREE.AmbientLight(0x404040); // 柔和的白光
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true; // 启用阴影
  scene.add(directionalLight);

  const loader = new FBXLoader();
  loader.load(testMod, (object) => {
    // 当模型加载完成时的回调
    const data = new THREE.Mesh(geometry, material);
    scene.add(object);
    console.log('FBX 模型加载成功', object);
  },
    (xhr) => {
      // 加载进度
      console.log(`加载进度: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
      // 加载错误
      console.error('FBX 模型加载失败', error);
    });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

function Index() {
  useEffect(() => {
    init()
  }, [])
  return (
    <div className={Styles.index}>
      <div id='wrapper'>
        <canvas id='scene'></canvas>
      </div>
    </div>
  );
}

export default Index;