<template>
 <n-config-provider :theme="theme" >
    <n-layout style="height:100vh">
        <n-layout-header class="header">
             <n-space  size="large" align ="center" justify="space-between">
                <n-tag :bordered="false" :round="true">
                    <h3>ThreeJs案例</h3>
                </n-tag>
                    <div>
                        切换主题
                        <n-switch v-model:value="value" 
                                    :round="false"
                                    @click="changeTheme" />
                    </div>
             </n-space>
        </n-layout-header>
            <n-layout-content content-style="padding: 24px;">
                <n-h3>小案例</n-h3>
                <n-grid cols="4">
                    <n-grid-item v-for="(p,index) of list" 
                        :key="index" style="margin:10px" @click="()=>clickItem(p.path)">
                            <n-card >
                                {{p.name}}
                            </n-card>
                    </n-grid-item>
                </n-grid>

                <n-h3>综合项目</n-h3>
                <n-grid cols="4">
                    <n-grid-item v-for="(p,index) of bigList" 
                        :key="index" style="margin:10px" @click="()=>clickItem(p.path)">
                            <n-card >
                                {{p.name}}
                            </n-card>
                    </n-grid-item>
                </n-grid>

            </n-layout-content>
    </n-layout>
</n-config-provider>
</template>

<script setup lang ="ts">
import {NGrid,NGridItem,NCard,NTag,
        NSwitch,NConfigProvider,NSpace,
        NLayout,NLayoutHeader,NLayoutContent,NH3} from 'naive-ui'
import {ref} from "vue"
import {useRouter} from "vue-router"
import { darkTheme } from 'naive-ui'
import {list,bigList} from "@/router"
import type { GlobalTheme } from 'naive-ui'
    const router = useRouter() 

    let value = ref(false)
    let theme =  ref<GlobalTheme | null>(darkTheme)
    function changeTheme(){
        theme.value = value.value?null:darkTheme;
    }
    function clickItem(path:string){
        router.push({path})
    }
</script>

<style scoped>
    .header{
        padding:20px;
    }
    .n-card{
        cursor:pointer;
        transition: all 0.5s;
    }
    .n-card:hover{
       transform: translateY(-5px);
       width:101%;
       height:101%;
    }
</style>