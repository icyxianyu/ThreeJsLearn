import { ThreeInit } from "@/utils/three";
import * as THREE from "three"
class children extends ThreeInit{
    lightHelper: THREE.SpotLightHelper | undefined;
    cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> | undefined;
    spotLight: THREE.SpotLight | undefined;
    time:number
    center: THREE.Object3D<THREE.Event> | undefined;
    spotmesh: any;
    pointLight:any;
    pointHelper: THREE.PointLightHelper | undefined;
    constructor(element:HTMLElement){
        super(element);
        this.time = 0;
        this.createPlane();
        this.createCube();
        this.createLight();
        this.createPointLight();
        this.createToru();
        this.render();
    }
    createPlane():void{
        const geometry = new THREE.PlaneGeometry( 10000, 10000 );
        const material = new THREE.MeshStandardMaterial( { color:0x808080 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 0 );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene?.add( mesh );
    }
    createCube():void{
        const geometry = new THREE.BoxGeometry( 100, 100 ,100);
        const material = new THREE.MeshStandardMaterial( { color:0x27262c } );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.set( 0, 50, 0 );
        this.cube.receiveShadow = true;
        this.cube.castShadow = true;
        this.scene?.add( this.cube );
    }
    createToru():void{
        const geometry = new THREE.TorusKnotGeometry( 100, 40, 100, 16 );
        const material = new THREE.MeshStandardMaterial( { color: 0x27262c } );
        const torusKnot = new THREE.Mesh( geometry, material );
        torusKnot.position.set(100,100,500)
        this.scene?.add( torusKnot );
    }
    createLight():void{
        this.spotLight = new THREE.SpotLight( 0xffffff, 10 , 100);
        this.spotLight.position.set( 500, 500, 500 );
        this.spotLight.angle = Math.PI / 12;
        this.spotLight.penumbra = 1;
        this.spotLight.decay = 2;
        this.spotLight.distance = 10000;
        this.spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;
        this.spotLight.shadow.camera.near = 10;
        this.spotLight.shadow.camera.far = 200;
        this.spotLight.shadow.focus = 1;
        
        if(this.cube)
            this.spotLight.target = this.cube
        this.scene?.add( this.spotLight );

        this.lightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.scene?.add( this.lightHelper );
    }
    createPointLight():void{
        this.pointLight = new THREE.PointLight(0xffffff,10, 1000)
        this.pointLight.position.set( 100, 50, 250 );

        this.pointHelper = new THREE.PointLightHelper(this.pointLight);
        this.scene?.add (this.pointHelper)
        this.scene?.add(  this.pointLight );
    }
    render(): void {
        if (this.renderer && this.scene && 
            this.camera && this.controls 
            && this.lightHelper &&this.spotLight&&this.pointHelper
            ) {
            requestAnimationFrame( this.render.bind(this) );
            this.controls.update();

            const radius = 500;
            const angle = this.time * 0.01;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            this.spotLight.position.set(x, 500, z);

            this.pointLight.distance =Math.abs(1000* Math.sin(angle));
            this.lightHelper.update();
            this.pointHelper.update()
            this.renderer.render(this.scene, this.camera);
            this.time++;
        }
    }
}   
export default children

