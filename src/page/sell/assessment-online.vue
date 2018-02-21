<template>
	<div class="assessment-onlineBox">
		<div class="assessmentOnlineBox_bgColor"></div>
		<assessment :cityId="cityId" :cityName="cityName" :userName="userName"></assessment>
	</div>
</template>

<script>
	import assessment from '../sell/assessment.vue'; 

	export default{
		components:{
			assessment
		},
		data(){
			return{
				cityId: '',
				cityName: '',
				userName: ''
			}
		},
		created(){
			this.cityId = this.$route.query.cityId;
			this.cityName = this.$route.query.cityName;
			this.userName = this.$route.query.userName;
		},
		mounted(){

		},
		mothods:{

		}
	}
</script>