<template>

    <div class="boxContain">
         <div  class="boxContain-top">
            <n-layout-header 
                class="boxContain-top-header"
                bordered>
                <n-h3>设置属性</n-h3>
            </n-layout-header>
                <n-layout-content class="boxContain-content" >
                   <attribute/>
                </n-layout-content>
        </div>
        <div  class="boxContain-top">
            <n-layout-header 
                class="boxContain-top-header"
                bordered>
                <n-h4>已插入物体</n-h4>
            </n-layout-header>
                <n-layout-content class="boxContain-content" >
                    <insertCard/>
                </n-layout-content>
        </div>


    </div>

</template>

<script setup lang ="ts">

 import {NH3,NH4,NLayoutHeader,NLayoutContent} from "naive-ui"
 import insertCard from "./insertCard.vue" 
 import attribute from "./attribute.vue"


</script>

<style scoped lang="less">
    .boxContain{
        height:100vh;
        &-top{
            height:50%;
            display: flex;
            flex-direction: column;
            &-header{
                height: 64px; 
                padding: 24px
            }
        }
    }
</style>