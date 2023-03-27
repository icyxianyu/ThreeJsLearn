<template>
    <n-config-provider :theme="darkTheme" >
       <n-layout has-sider style="height:100vh" >
        <n-layout-sider 
                    collapse-mode="transform"
                    :collapsed-width="10"
                    
                    show-trigger="arrow-circle"
                    content-style="padding: 24px"
                    :show-collapsed-content=false
                    bordered>
                    <leftSlider></leftSlider>
                </n-layout-sider>
                <n-layout has-sider sider-placement="right">
                    <canvasInstance/>
                <n-layout-sider
                        class="temp"
                        show-trigger
                        collapse-mode="width"
                        :collapsed-width="10"
                        :show-collapsed-content=false
                        :width="240"
                        :native-scrollbar="false">       
                            <rightSlider ></rightSlider>
                    </n-layout-sider>
                </n-layout>
       </n-layout>
    </n-config-provider>
   </template>
   
   <script setup lang ="ts">
    import leftSlider from "./leftSlider.vue"
    import rightSlider from "./rightSlider.vue"
    import { darkTheme } from 'naive-ui'
    import {NLayout,NLayoutSider ,NConfigProvider} from 'naive-ui'
    import canvasInstance from "./canvas.vue"

   </script>
   
   <style scoped>

   </style>