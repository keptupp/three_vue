<template>
  <div id="loadobject">
    
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
	name: 'LoadObject',
	data:function(){
		return{
			dog:"你好"
		}
	},
	mounted() {
		const scene =new THREE.Scene();
		const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
		const renderer=new THREE.WebGLRenderer();

		renderer.setSize(window.innerWidth,window.innerHeight);
		document.getElementById('loadobject').appendChild(renderer.domElement);

		camera.position.set(0,0,5);//设置相机的位置
		camera.lookAt(0,0,0);//设置相机的朝向
		const loader = new GLTFLoader();
		var dog={}
		loader.load('http://localhost:8080/shiba/scene.gltf',
			function ( gltf ) {
				dog=gltf.scene
				scene.add( dog );
			},
			undefined,
			function ( err ) {
				console.error( 'An error happened' );
			}
		);

		function animate() {
			requestAnimationFrame( animate );
			dog.rotation.y+=0.01
			
			renderer.render( scene, camera );
		};
		animate();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
