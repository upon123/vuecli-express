<template>
	<div class="orderNone">
        <div class="div">
            <img src="../../../static/images/noorder.png" alt="" class="img">
            <p>您还没有订单！</p>
            <div class="cxjz" @click="gobuycar()">
                马上逛逛
            </div>
        </div>
    </div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods: {
			gobuycar(){
				var bridge = getJsBridge();
					bridge.call("goToBuy",{url: this.$global().url+"buycar"});
			}
		}
	}
</script>