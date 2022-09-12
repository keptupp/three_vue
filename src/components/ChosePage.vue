<template>
	<div id="chosepage">
		<button type="button" @click="loadObject()">加载模型demo</button>
		<button type="button" @click="orbitControls()">轨道控制器demo</button>
		<button type="button" @click="pointerLockControls()">锁定鼠标控制器demo</button>
		<button type="button" @click="spaceAduio()">空间音频demo</button>
		
	</div>
</template>

<script>
	export default {
		name: 'ChosePage',
		methods:{
			loadObject(){
				this.$router.push({path:'/LoadObject'}).catch(err => err)
			},
			orbitControls(){
				this.$router.push({path:'/OrbitControls'}).catch(err => err)
			},	
			pointerLockControls(){
				this.$router.push({path:'/PointerLockControls'}).catch(err => err)
			},
			spaceAduio(){
				this.$router.push({path:'/SpaceAudio'}).catch(err => err)
			}
		}
	}
</script>

<style>
	button{
		margin: 30px;
	}
</style>
