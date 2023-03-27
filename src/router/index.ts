import {createRouter,createWebHistory} from "vue-router"
export const list=[{
        path:"/boxAndSky",
        name:"天空盒与水面",
        component:()=>import("@/components/boxAndSky/three.vue")
        },{
            path:"/mrdoob",
            name:"光源",
            component:()=>import("@/components/mrdoob/index.vue")
        }]
export const bigList=[
    {
        path:"/drag",
        name:"拖拽组件",
        component:()=>import("@/components/drag/index.vue")
    }
]
const router = createRouter({
        history:createWebHistory(),
        routes:[{
            path:"/",
            component:()=>import("@/components/main/index.vue")
        },...list,...bigList]
})

export default router ;