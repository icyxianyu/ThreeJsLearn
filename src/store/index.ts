import { createStore } from 'vuex'
/**
 * 创建仓库和导出
 */
export default createStore<State>({
    state:{
            canvasInstance:null,
            clickNode:null,
            clickInstance:{},
            clickInstances :{} ,
            originInstances:[],
    },
    mutations:{
        convasInstanceAction(state,value){
            state.canvasInstance = value
        },
        clickNodeMutations(state,value){
            state.clickNode = value
        },
        clickInstanceMutations(state,value){
            state.clickInstance = value.cube;
            if(JSON.stringify(value.cube)!=="{}"){

                const temp :any={};
                temp[value.cube.uuid] = value.clickvalue;
                state.clickInstances = {...state.clickInstances,...temp}
                state.originInstances = [...state.originInstances,value.cube]

            }
        },

    },
    actions:{
        canvasInstanceAction(conted,val){
            conted.commit("convasInstanceAction",val)
        },
        clickAction(conted,val){
            conted.commit("clickNodeMutations",val)
        },
        InstanceAction(conted,val){
            conted.commit("clickInstanceMutations",val)
        }
    },
})