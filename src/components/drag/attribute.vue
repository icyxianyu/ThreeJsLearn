<template >
 <n-form
        v-if="JSON.stringify(attr) !== '{}' "
        ref="formRef"
        :label-width="80"
        :model="attr">
            <n-collapse>

                <n-collapse-item 
                    v-for="item of formList"
                    :title="item.title" 
                    :name="item.name" 
                    :key="item.name">
                        <n-form-item 
                            v-for="p of Object.keys(attr[item.name])"  
                            :key="p" >
                            <div class="name">
                            {{ p + " : "}}
                            </div>
                            <n-input-number 
                                v-model:value="attr[item.name][p]" />
                        </n-form-item>
                </n-collapse-item>


            </n-collapse>

    </n-form>
</template>
<script setup lag="ts">
import {computed,ref,reactive} from "vue"
import {useStore} from "vuex"
import {NForm,
        FormInst,
        NFormItem,
        NInputNumber,
        NCollapse,
        NCollapseItem} from 'naive-ui'

    const store = useStore();
    const attr = computed(()=>{
        return store.state.clickInstance
    })
    const formList = reactive([
        {
            title:"位置设定",
            name:"position" 
        },{
            title:"大小设定",
            name:"scale"
        }
    ])
    const formRef = ref<FormInst | null>(null)

</script>
<style lang="less">
    .n-form-item{
        padding:5px;
        &.n-form-item--top-labelled{
            grid-template-rows: 1fr;
        }
        .n-form-item-blank{
            justify-content: space-around;
            .name{
                flex:1;
            }
            .n-input-number{
                flex:5
            }
        }
        .n-form-item-feedback-wrapper{
            display: none;
        }
    }
</style>