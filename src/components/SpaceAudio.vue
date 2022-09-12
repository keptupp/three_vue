<template>
	<div id="spaceaudio">
		<button id="mouse" type="button" @click="lockMouse()">锁定鼠标</button>
		<button id="audioControl" type="button" @click="audioControl()">播放/暂停</button>
	</div>
</template>

<script>
	/* eslint-disable */
	import * as THREE from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
	
	export default{
		name:'SpaceAudio',
		data(){
			return {
				scene:{},
				camera:{},
				renderer:{},
				controls:{},
				sound:{}
			}
		},
		methods:{
			initThree(){
				const scene=new THREE.Scene()//场景
				scene.background = new THREE.Color(0xAFEEEE)//设置场景背景颜色
				const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
				const renderer=new THREE.WebGLRenderer()
				renderer.setSize(window.innerWidth,window.innerHeight);
				
				document.getElementById('spaceaudio').appendChild(renderer.domElement);
				
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
			loadObject(url,x,y,z){
				const loader = new GLTFLoader();
				const scene=this.scene
				loader.load(url,
					function ( gltf ) {
						gltf.scene.position.x=x
						gltf.scene.position.y=y
						gltf.scene.position.z=z
						console.log('模型加载')
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
			},
			initAudio(url){
				// 创建一个倾听者对象,给一个相机
				const listener = new THREE.AudioListener()
				
				this.camera.add(listener)
				
				// 创建一个音频对象，将倾听者对象给到
				const sound = new THREE.PositionalAudio( listener )
				this.sound = sound
				
				// 创建一个音频加载的对象，然后开始加载音频，
				const audioLoader = new THREE.AudioLoader();
				audioLoader.load( url, function( buffer ) {
					sound.setBuffer( buffer );
					sound.setRefDistance( 10 );
					sound.setVolume(0.1);//声音
					sound.setLoop( true );//循环播放
					sound.setRolloffFactor(2)//声音下降的速度
					console.log(sound)
					//sound.play();
				})
			},
			audioControl(){
				if(this.sound.isPlaying){
					this.sound.pause()
				}else{
					this.sound.play();
				}
			},
			setAudioPosition(){
				const sphere = new THREE.SphereGeometry(1, 1, 1);
				const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
				const mesh = new THREE.Mesh(sphere);
				mesh.position.x=-10
				mesh.position.y=1
				mesh.position.y=1
				this.scene.add( mesh );
				mesh.add(this.sound)
			}
		},
		mounted() {
			this.initThree()
			this.initControls()
			this.start()
			this.loadObject('/shiba/scene.gltf',-10,1,1)
			this.loadObject('/shiba/scene.gltf',10,1,1)
			//this.loadObject('/free_1975_porsche_911_930_turbo/scene.gltf',5,1,1)
			
			//以上是鼠标锁定视角的代码，下面是空间音频的代码
			//单独为这个声音创建网格模型来标记声音位置
			this.initAudio('smile.mp3')
			this.setAudioPosition()
		}
		
	}
</script>

<style scoped>
	#mouse{
		position: absolute;
		left: 10%;
		top:10%;
	}
	#audioControl{
		position: absolute;
		left: 15%;
		top: 10%;
	}
</style>
