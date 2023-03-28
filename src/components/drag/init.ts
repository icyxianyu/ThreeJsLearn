import { getMeshLowestToCenterLength } from "@/utils/lowestPoint";
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { ThreeInit } from "@/utils/three"
import * as THREE from "three"
import {useStore} from "vuex";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

export default class children extends ThreeInit{
    plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | undefined;
    store: any;
    boxHelper: THREE.BoxHelper | undefined;
    stats: any;
    outlinePass: OutlinePass|any;
    outlinePassClick:OutlinePass|any;
    composer: any;
    clicInstance: any;
    constructor(element:HTMLElement){
        super(element);
        this.initCarame();
        this.initOutline()
        this.initStats()
        this.createPlane();
        this.render();
        this.createAxis()
        this.observe(this.element);
        this.store = useStore();
    }
    initOutline(){
        if(this.renderer&&this.scene&&this.camera){
            this.composer = new EffectComposer(this.renderer);
            this.composer.addPass(new RenderPass(this.scene, this.camera));
            
            this.outlinePass = new OutlinePass(new THREE.Vector2(this.el.width, this.el.height), this.scene, this.camera);
            this.outlinePassClick = new OutlinePass(new THREE.Vector2(this.el.width, this.el.height), this.scene, this.camera);
            this.outlinePassClick.visibleEdgeColor.set( 0xff0000 );
            this.outlinePassClick.renderToScreen = true;
            
            this.composer.addPass(this.outlinePass);
            this.composer.addPass(this.outlinePassClick);
            const effectFXAA = new ShaderPass( FXAAShader );
            effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
            this.composer.addPass( effectFXAA );
        }
    }
    initCarame(){
        this.camera?.position.set(50,50,50);
        if(this.controls)
            this.controls.enablePan=false
    }
    initStats(){
        this.stats = new Stats();
        this.stats.domElement.style.position="absolute"
        this.stats.domElement.style.top='0px';
        this.element.appendChild(this.stats.domElement)
    }

    createPlane():void{
        const geometry = new THREE.PlaneGeometry( 100, 100);
        const material = new THREE.MeshBasicMaterial( { color:0x808080 } );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.position.set( 0, 0, 0 );
        this.plane.rotation.x = - Math.PI / 2;
        this.plane.receiveShadow = true;
        this.scene?.add(this.plane );
    }

    
    createAxis(){
        const axes = new THREE.AxesHelper(100);
        this.scene?.add(axes)
    }


    render(): void {
        if (this.renderer && this.scene && 
            this.camera && this.controls ) {
            requestAnimationFrame( this.render.bind(this) );
            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            this.stats.update();
            this.composer.render();
            this.stats.end();
        }
    }

    createCube({geometory ,geoOption,Material,materialOption,position}:createCube):any{
            const geometryType = new THREE[geometory](...geoOption)
            const material = new THREE[Material](materialOption)
            const cube = new THREE.Mesh( geometryType, material );
            cube.position.set( ...position );
            this.scene?.add(cube );
            return cube;
        }
    
    mouseMove(event: MouseEvent){
        this.addMouseEvent(event);
    }
    contextmenu(){
        this.store.dispatch("clickAction",{});
        this.store.dispatch("InstanceAction",{cube:{}})
    }

    addMouseEvent(event: any):void{  

        const clickNode=this.store.state.clickInstance;

        if(this.camera&&this.plane&&this.scene&&JSON.stringify(clickNode) !== "{}"){
                const intersects = this.Raycaster(event,this.plane);
                if (intersects&&intersects.length > 0 ) {
                    intersects[0].point.y+=getMeshLowestToCenterLength(clickNode)
                    clickNode?.position.copy(intersects[0].point)
            }
        }else{
            const intersectObjects =this.Raycaster(event,...this.scene.children);
            if(intersectObjects&&intersectObjects.length > 0 ){        
                const  selectedObjects :any= [] ;
                const  selectedObject = intersectObjects[ 0 ].object;
                selectedObjects.push( selectedObject );
                this.outlinePass.selectedObjects = selectedObjects;
            }
        }

    }

    mouseClick(event:any):void{
        const intersects = this.Raycaster(event,...Object.values(this.store.state.originInstances));
        if(intersects&&intersects.length>0){
            this.clicInstance = intersects[0].object;
            this.outlinePassClick.selectedObjects = [this.clicInstance]
        }
    }

    Raycaster(event:any,...observered:any){
        if(this.camera&&this.plane&&this.scene){
            const mouse = new THREE.Vector2();
            const raycaster = new THREE.Raycaster();
            mouse.x = ((event.clientX -this.el.left)/ this.el.width) * 2 - 1;
            mouse.y = -((event.clientY -this.el .top)/ this.el.height) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(observered,true);
            return intersects
        }
    }   
}