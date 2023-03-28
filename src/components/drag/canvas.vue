<template >
    <n-layout-content >
        <div ref="canvas" 
            class="canvas" 
            @contextmenu="canvasInstance.contextmenu"
            @mousemove="canvasInstance.mouseMove"
            @click="canvasInstance.mouseClick"
            > </div>
    </n-layout-content>
</template>
<script setup>
import {NLayoutContent} from 'naive-ui'
import { onMounted, ref,watch ,computed,} from 'vue';
import ThreeCanvas  from "./init"
import { useStore } from  "vuex"
const store = useStore();

let canvas = ref(null);
let canvasInstance = ref();

    onMounted(() => {
        if(canvas.value){
            canvasInstance.value = new ThreeCanvas(canvas.value);
            canvasInstance.value.appendChild();
            store.dispatch("canvasInstanceAction",canvasInstance)

        }
    })
    const clickvalue = computed(()=>{
        return store.state.clickNode;
    })
    watch(clickvalue,(newValue)=>{
        if(JSON.stringify(newValue)!=="{}"){
            const cube = canvasInstance.value.createCube(newValue);
            store.dispatch("InstanceAction",{cube,clickvalue:clickvalue.value})
        }
    })

</script>
<style scoped>
.canvas{
    width:100%;
    height:100%;
    cursor: move;
}
 
</style>