<template >
    <div>
        <n-input-number  ></n-input-number> 
        <n-input-number></n-input-number> 
        <n-input-number></n-input-number> 
        {{ position?.x }}
        {{ position?.y }}
        {{ position?.z }}
    </div>
</template>
<script setup lag="ts">
import {computed,watch,reactive} from "vue"
import {useStore} from "vuex"
import {NInputNumber} from 'naive-ui'
const store = useStore();
const attr = computed(()=>{
    return store.state.clickInstance
})
const position =computed(()=>{
    return attr.value.position
})
watch(attr,(newValue)=>{
    console.log(newValue)
})
</script>
<style lang="less">
    
</style>