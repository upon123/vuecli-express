<template>
	<div class="set">
		<div class="setborder"></div>
		<div class="set-eliminate">
			 <p class="set-eliminate-p1" @click="clearSession">清除缓存<span>{{storage}}</span></p>
			 <p class="set-eliminate-p2" @click="version">版本介绍<span>V2.1.0</span></p>
		</div>
		<div v-show="setQuit" class="set-quit">
			<p @click="signOutLogin">退出登录</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
            return{
            	storage: '',
            	setQuit:false
            }
		},
		mounted(){
			var bridge = getJsBridge();
			var user = bridge.call("getUserId");
			this.storage = bridge.call("getCache");
			if(user == "-1"){
				this.setQuit = false;
			}else{
				this.setQuit = true;
			}
		},
		methods:{
			clearSession(){				
				var bridge = getJsBridge();
				var clear = bridge.call("clearCache");		
				if(clear == "0"){
					this.storage = "0M";
					bridge.call("showAlert",{msg:"缓存清除成功！"});
				}else{
					bridge.call("showAlert",{msg:"缓存清除失败！"});
				}		
			},
			version(){
				var bridge = getJsBridge();
				bridge.call('startNativeActivity',{url:this.$global().url+"version",title:"版本介绍"});
			},
			signOutLogin(){
				var bridge = getJsBridge();
				bridge.call("logout");
			}
		}
	}
</script>