<template>
	<div id="orbitcontrols">
		
	</div>
</template>

<script>
	/* eslint-disable */
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'//轨道控制器，控制一个物体的角度
	import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'//第一人称控制器
	import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'//飞行控制器，感觉和第一人称控制器没什么区别
	export default{
		name:'OrbitControls',
		mounted() {
			const scene=new THREE.Scene()
			scene.background = new THREE.Color(0xAFEEEE)//设置场景背景颜色
			const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
			const renderer=new THREE.WebGLRenderer();
			
			renderer.setSize(window.innerWidth,window.innerHeight);
			document.getElementById('orbitcontrols').appendChild(renderer.domElement);
			
			camera.position.set(0,0,5);//设置相机的位置
			camera.lookAt(0,0,0);//设置相机的朝向
			
			const gridHelper = new THREE.GridHelper( 100, 100 );
			scene.add(gridHelper)
			
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
			
			//相比于加载模型，new一个OrbitControls出来，把camer和元素renderer带入
			const controls = new OrbitControls( camera, renderer.domElement );
			// const controls = new FirstPersonControls( camera, renderer.domElement)
			// controls.lookSpeed = 0.3; //鼠标移动查看的速度
			//const controls = new FlyControls(camera, renderer.domElement)

			
			
			let clock = new THREE.Clock();
			function animate() {
			
				requestAnimationFrame( animate );
			
				//跟新坐标
				controls.update(clock.getDelta());
			
				renderer.render( scene, camera );
			
			}
			animate()
			
		}
	}
</script>

<style>
</style>
