<template>
	<div id="pointerlockcontrols">
		<button id="mouse" type="button" @click="lockMouse()">锁定鼠标</button>
	</div>
</template>

<script>
	/* eslint-disable */
	// 这个控制器比较特殊,单独写一个文件
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'//指针锁定控制器，第一人称射击游戏的感觉
	export default{
		name: 'PointerLockControls',
		data(){
			return{
				scene:{},
				camera:{},
				renderer:{},
				controls:{},
			}
		},
		methods:{
			initThree(){
				const scene=new THREE.Scene()//场景
				scene.background = new THREE.Color(0xAFEEEE)//设置场景背景颜色
				const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
				const renderer=new THREE.WebGLRenderer()
				renderer.setSize(window.innerWidth,window.innerHeight);
				
				document.getElementById('pointerlockcontrols').appendChild(renderer.domElement);
				
				camera.position.set(0,1,5);//设置相机的位置
				camera.lookAt(0,0,0);//设置相机的朝向
				
				const gridHelper = new THREE.GridHelper( 100, 100 );
				scene.add(gridHelper)
				this.scene=scene
				this.camera=camera
				this.renderer=renderer

			},
			keyListen(){
				window.addEventListener('keydown',(e)=>{
					if(e.key==='w'){
						this.controls.moveForward(0.1)
					}else if(e.key==='s'){
						this.controls.moveForward(-0.1)
					}else if(e.key==='a'){
						this.controls.moveRight(-0.1)
					}else if(e.key==='d'){
						this.controls.moveRight(0.1)
					}
				},false)
	
			},
			start(){
				var animate=()=>{
					requestAnimationFrame( animate );
					
					this.renderer.render( this.scene, this.camera );
				}
				animate()
			},
			loadObject(url){
				const loader = new GLTFLoader();
				const scene=this.scene
				loader.load(url,
					function ( gltf ) {
						gltf.scene.position.y=1
						scene.add(gltf.scene)
					},
					undefined,
					function ( err ) {
						console.error( 'An error happened' );
					}
				)
			},
			initControls(){
				this.controls=new PointerLockControls(this.camera,this.renderer.domElement)
				
				this.keyListen()
			},
			lockMouse(){
				this.controls.lock()
			}
		},
		mounted(){
			this.initThree()
			this.initControls()
			this.start()
			this.loadObject('/shiba/scene.gltf')

		}
	}
</script>

<style scoped="">
	#mouse{
		position: absolute;
		left: 10%;
		top:10%;
	}
</style>
