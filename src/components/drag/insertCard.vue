<template>
    <div v-for="(item,index) of insertCards" :key="item.uuid">
        <n-card class="card" size="small" 
        :class="clickvalue.uuid === item.uuid? ' clickNode':'' " 
        content-style="font-size: 5px; padding:5px" 
        @click="()=>changeNode(item.uuid)">
            {{index}} - {{ item.CName }}
        </n-card>

    </div>
</template>
<script setup lang="ts">
import {NCard} from "naive-ui"
import {useStore} from "vuex"
import {computed,watch} from "vue"
const store =useStore();
const clickvalue = computed(()=>{
        return store.state.clickInstance;
})
const insertCards:any =computed(()=>{
    return Object.values(store.state.clickInstances)
})
const changeNode = (item:any) =>{
   store.state.canvasInstance.clickBack(
   store.state.originInstancesObject[item])
}
</script>
<style lang="less">
   .card{
    margin-bottom:10px;
    cursor: pointer;
    transition: all 0.5s;
    user-select: none;
   }
   .clickNode{
        background-color:aliceblue;
        color:black
   }
   .card:hover{
        border-color:aquamarine
   }
</style>