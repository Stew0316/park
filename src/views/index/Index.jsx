
import * as THREE from 'three';
import Styles from '@/style/Index.module.scss';
import { useEffect } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
function init() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const canvas = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  const wireframeGeometry = new THREE.WireframeGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
  scene.add(wireframe);
  camera.position.z = 5;
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();
  function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
	  cube.rotation.y += 0.01;
    wireframe.rotation.x += 0.01;
    wireframe.rotation.y += 0.01;
    controls.update();
    renderer.render( scene, camera );
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