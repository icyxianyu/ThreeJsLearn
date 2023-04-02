import { createStore } from 'vuex'
/**
 * 创建仓库和导出
 */
export default createStore<State>({
    state:{
            canvasInstance:{},
            appendNode:{},
            clickNode:{},
            clickInstance:{},
            clickInstances :{} ,
            originInstances:[],
            originInstancesObject:{},
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
                const tempObject :any ={}
                tempObject[value.cube.uuid] = value.cube
                temp[value.cube.uuid] = {...value.clickvalue,uuid:value.cube.uuid};
                state.clickInstances = {...state.clickInstances,...temp}
                state.originInstances = [...state.originInstances,value.cube]
                state.originInstancesObject= {...state.originInstancesObject,...tempObject}
            }
        },
        clickCanvasMutations(state,value){
            state.clickInstance = value;
        },
        appendNodeMutations(state,value){
            state.appendNode = value;
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
        },
        clickCanvas(conted,val){
            conted.commit("clickCanvasMutations",val)
        },
        appendNodeAction(conted,val){
            conted.commit("appendNodeMutations",val)
        },
    },
})