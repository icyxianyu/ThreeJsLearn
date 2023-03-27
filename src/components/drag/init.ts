import { getMeshLowestToCenterLength } from "@/utils/lowestPoint";
import { ThreeInit } from "@/utils/three"
import * as THREE from "three"
import {useStore} from "vuex";

export default class children extends ThreeInit{
    plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | undefined;
    store: any;
    boxHelper: THREE.BoxHelper | undefined;
    constructor(element:HTMLElement){
        super(element);
        this.createPlane();
        this.initCarame();
        this.render();
        this.createAxis()
        this.observe(this.element);
        this.store = useStore()
        this.renderer?.domElement.addEventListener('click',(event)=>this.mouseClick.call(this,event));
    }

    initCarame(){
        this.camera?.position.set(50,50,50);
        if(this.controls)
            this.controls.enablePan=false
    }

    createCube({geometory ,geoOption,Material,materialOption,position}:createCube):any{
        const geometryType = new THREE[geometory](...geoOption)
        const material = new THREE[Material](materialOption)
        const cube = new THREE.Mesh( geometryType, material );
        cube.position.set( ...position );
        this.scene?.add(cube );
        return cube;
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
        }
    }


    mouseEvent():void{
        const handleMouseMove = (event: MouseEvent) => {
            this.addMouseEvent(event);
        };
        const handleContextMenu = (event: MouseEvent) => {
            this.renderer?.domElement.removeEventListener('mousemove', handleMouseMove);
            this.store.dispatch("clickAction",{});
            this.store.dispatch("InstanceAction",{cube:{}})
        };

        
        this.renderer?.domElement.addEventListener('mousemove', handleMouseMove);
        this.renderer?.domElement.addEventListener('contextmenu', handleContextMenu);
    }


    addMouseEvent(event: any):void{      
        const clickNode=this.store.state.clickInstance;
        if(this.camera&&this.plane&&JSON.stringify(clickNode) !== "{}"){
            const intersects = this.Raycaster(event,this.plane);
            if (intersects&&intersects.length > 0 ) {
                intersects[0].point.y+=getMeshLowestToCenterLength(clickNode)
                clickNode?.position.copy(intersects[0].point)
            }
        }
    }
    mouseClick(event:any):void{
        const intersects = this.Raycaster(event,...Object.values(this.store.state.originInstances));

        // if(intersects&&intersects.length>0){
        //    this.boxHelper=new THREE.BoxHelper( intersects?.[0].object )
        //    this.scene?.add(this.boxHelper);
        // }
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