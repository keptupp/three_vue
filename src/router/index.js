//该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

import ChosePage from '../components/ChosePage.vue'
import LoadObject from '../components/LoadObject.vue'
import OrbitControls from '../components/OrbitControls.vue'
import PointerLockControls from '../components/PointerLockControls.vue'
import SpaceAudio from '../components/SpaceAudio.vue'


//创建并暴露一个路由器
export default new VueRouter({
	routes:[
		{
			path:'/',
			component:ChosePage
		},{
			path:'/LoadObject',
			component:LoadObject
		},{
			path:'/OrbitControls',
			component:OrbitControls
		},{
			path:'/PointerLockControls',
			component:PointerLockControls
		},{
			path:'/SpaceAudio',
			component:SpaceAudio
		}
	]
})