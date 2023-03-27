<template>
    <div class="mainbox" ref="mainbox"></div>
</template>

<script setup lang ="ts">
import { ref , onMounted} from "vue"
import ThreeIsland from "./init"


    const mainbox = ref(null)
    let three = ref();
    onMounted(() => {
        if(mainbox.value){
            three.value = new ThreeIsland(mainbox.value);
            three.value.appendChild();
        }
        // three.value.createSky();
        // const {appendChild} = three.value
        // appendChild()
        // this.element.addEventListener("resize",()=>{
        //     this.camera.aspect = this.el.width/this.el.height
        //     this.camera.updateProjectionMatrix();
        //     this.renderer.setSize(this.el.width,this.el.height);
        // })
    })
</script>

<style scoped>
.mainbox{
    height:100vh;
    width:100vw;
}
</style>