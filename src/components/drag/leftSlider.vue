<template>
    <n-layout position="absolute" >
        <n-layout-header 
        style="height: 64px; padding: 24px" 
        bordered>
            <n-h2>选择物体添加入场景中</n-h2>
        </n-layout-header>

        <n-layout  position="absolute" style="top: 64px">
            <n-layout content-style="padding: 24px;">
                <n-card v-for="(p,index) of ThreeNodes" :key="index" 
                :title="p.CName"
                class="card" 
                @click="()=>clickNode(p)">
                {{ p.name }}
            </n-card>
            </n-layout>
            </n-layout>
    </n-layout>
</template>

<script setup lang ="ts">
    import { useStore } from "vuex";
    import {NCard,NH2,NLayout,NLayoutHeader} from "naive-ui"
    import {ThreeNodes} from "@/constant"
    const store = useStore()

    const clickNode=(p:any)=>{
        store.dispatch('appendNodeAction',p);
    }

</script>

<style scoped>
.canvas{
 width:100%;
 height:100%;
}
.card{
    margin-bottom: 10px;
}
.card:hover{
    border-color:aqua;
    cursor: pointer;
}
</style>