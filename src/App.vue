<template>
  	<div id="app">
  		<div :style="wrppera" id="container" class="container-content">
  	  		<keep-alive  include="test-keep-alive">
  				<router-view/>
  			</keep-alive>	
  	  	</div>
		
 
  	</div>
</template>
<script>
export default {
data() {
	return {
		wrppera:{
        "width": "100%",
        // "height": "640px",
       "minHeight":"640px"
      }
	}
},
created() {
	
},
mounted() {
	var height1 = window.innerHeight;
	this.wrppera.minHeight = height1 - 88 +'px';
},
}
</script>
<style>
.container-content{background:#c4b0b0;padding: 44px 0; flex: 1}
#container{background:#f5f5f5}



</style>
