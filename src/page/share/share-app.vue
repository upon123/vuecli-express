<template>
	<div>
		<div class="share">
			<img @click.stop="close" class="closeshare" src="../../../static/images/closeshare.png">
			<img class="sharelogo" src="../../../static/images/sharelogo.png">
			<p>奥迪二手车App，</br>线上购车享2年0利率</p>
			<a :href="$global().downloadApp"><button type="button">立即下载</button></a>
		</div>
		
		<div style="height:1.08rem;width:100%;"></div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			close(){
				this.$emit('ievent',false);
			}
		}
	}
</script>