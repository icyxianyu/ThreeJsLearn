import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" 
/* eslint-disable */
import {Water} from "three/examples/jsm/objects/Water"
import { Sky } from 'three/examples/jsm/objects/Sky.js';
const skyURL=require("./static/sky.jpg")
const skyMp4=require("./static/sky.mp4")
const waterURL = require("./static/water.jpg")
class ThreeIsland{

    element:HTMLElement
    el: DOMRect;
    scene!: THREE.Scene | null;
    camera!: THREE.PerspectiveCamera | null  ;
    renderer!: THREE.WebGLRenderer | null;
    controls: OrbitControls | undefined;
    water: Water | undefined
    sky: Sky | undefined;
    cubeBox: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> | undefined;
    time: number;
    constructor(element:HTMLElement){
        this.element = element
        this.el = element.getBoundingClientRect();
        this.time=0;
        this.init()
    }

    init():void{
        this.scene = new THREE.Scene();
        this.setCamera();
        this.setRenderer();
        this.control();
        this.createWater()
        this.createCube();
        // this.createSky()
        // this.setSun();
        this.createSky();
        // this.createArrow();
        this.render();
    
    }

    setCamera():void{
        this.camera = new THREE.PerspectiveCamera(75,
            this.el.width/this.el.height,
            0.1,
            8000)
        this.camera.position.set(100,100,-550)
        this.camera.aspect = this.el.width/this.el.height;
        this.camera.updateProjectionMatrix();
        this.scene?.add(this.camera)
    }

    setRenderer():void{
        this.renderer = new THREE.WebGLRenderer({antialias:true,})
        this.renderer.setSize(this.el.width,this.el.height);

    }
    


    control():void{
        if(this.camera&&this.renderer){
            this.controls = new OrbitControls(this.camera,this.renderer.domElement);
            this.controls.maxPolarAngle = Math.PI * 0.495;
            this.controls.target.set( 0, 10, 0 );
            this.controls.minDistance = 40.0;
            this.controls.maxDistance = 1000.0;
            this.controls.enableDamping =true;
            this.controls.update();
        }
    }
      // 创建网格模型
    setSun(){
        // const light = new THREE.DirectionalLight(0xfffff,1);
        // light.position.set(-100,100,10);
        // this.scene?.add(light)
        // const pointLigh = new THREE.PointLight('#ccffcc')
        // // pointLigh.dispose = 100;
        // pointLigh.visible = true;
        // pointLigh.position.set(3, 0, 10)
        // const helper = new THREE.PointLightHelper(pointLigh);
        // this.scene?.add(pointLigh)
        // this.scene?.add(helper);
        // helper.update();
        const color = 0x000000;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        this.scene?.add(light);
        // const dirLight = new THREE.PointLight(0xFFFFF,4,160);
        // dirLight.visible =true;
        // dirLight.castShadow = true;
        // dirLight.position.set(100,100,100);

        // this.scene?.add(dirLight);
        // const spotLight = new THREE.SpotLight(0xffffff)
        // spotLight.position.set(80, 60, 10)
        // spotLight.castShadow = true
        // this.scene?.add(spotLight) // 聚光灯添加到场景中

        //  // 环境光
        // const ambientLight = new THREE.AmbientLight(0x0c0c0c) // 创建环境光
        // this.scene?.add(ambientLight) // 将环境光添加到场景

        // const pointLight = new THREE.PointLight(0xccffcc) // 创建点光源
        // pointLight.distance = 100 // 设置点光源照射距离为100
        // this.scene?.add(pointLight) // 将点光源添加到场景


        // const spherGeo = new THREE.SphereGeometry(10,100);
        // const spherMaterial = new THREE.MeshBasicMaterial({color:0xff000});
        // var sperMesh = new THREE.Mesh(spherGeo,spherMaterial);
        // sperMesh.castShadow= true;
        // sperMesh.position.set(100,100,100)
        // this.scene?.add(sperMesh);

    }
    createWater():void{
        const waterGeometry = new THREE.CircleGeometry( 1000, 64 );

        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 1024,
                textureHeight: 1024,
                waterNormals: new THREE.TextureLoader().load( waterURL, function ( texture ) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                } ),
                sunDirection: new THREE.Vector3(),
                waterColor: 0x262813,
                distortionScale: 3.7,
                fog: this.scene?.fog !== undefined
            }
        );

        this.water.rotation.x = - Math.PI / 2;

        this.scene?.add( this.water );
    }    // resize(){
    //     this.element.addEventListener("resize",()=>{
    //         this.camera.aspect = this.el.width/this.el.height
    //         this.camera.updateProjectionMatrix();
    //         this.renderer.setSize(this.el.width,this.el.height);
    //     })
    // }
    createCube():void{
        const cubeGeometory = new THREE.BoxGeometry(100,100,100);
        const boxMaterial = new THREE.MeshBasicMaterial({
            color:0xcccccc
        })
       this.cubeBox = new THREE.Mesh(cubeGeometory,boxMaterial);
       this.cubeBox.castShadow = true;

        this.scene?.add(this.cubeBox)
    }
    appendChild():void{
        if(this.renderer)
            this.element.appendChild(this.renderer.domElement)
    }
    createSky():void{
        if(this.scene){
            const skyGeometry = new THREE.SphereGeometry(1000,60,60);
            const skyMaterial = new THREE.MeshBasicMaterial({
                map:new THREE.TextureLoader().load(
                    skyURL)
            })  
            
            skyGeometry.scale(1,1,-1);
            
            const sky = new THREE.Mesh(skyGeometry,skyMaterial);
            this.scene.add(sky)

            // const video = document.createElement("video");
            // video.src= skyMp4;
            // video.loop= true;
            // window.addEventListener("click",()=>{
            //     if(video.paused){
            //         video.play();
            //         skyMaterial.map = new THREE.VideoTexture(video);
            //         skyMaterial.map.needsUpdate =true;
            //     }
            // })
        }
    }
    createArrow():void{
        const dir = new THREE.Vector3( 100, 100, 100 );

        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();
        
        const origin = new THREE.Vector3( 0, 0, 0 );
        const length = 1;
        const hex = 0xccc;
        
        const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
        this.scene?.add( arrowHelper );
    }
    // createSky() :void{
    //     if(this.renderer&&this.water&&this.scene ){
    //         this.sky = new Sky();
    //         this.sky.scale.setScalar( 10000 );
    //         this.scene?.add( this.sky );

    //         const skyUniforms = this.sky.material.uniforms;

    //         skyUniforms[ 'turbidity' ].value = 10;
    //         skyUniforms[ 'rayleigh' ].value = 2;
    //         skyUniforms[ 'mieCoefficient' ].value = 0.005;
    //         skyUniforms[ 'mieDirectionalG' ].value = 0.8;
    //         const parameters = {
    //             elevation: 2,
    //             azimuth: 180
    //         };
    //         const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
    //         let renderTarget: THREE.WebGLRenderTarget | undefined;
    //         let sun = new THREE.Vector3();
    //         this.updateSun({parameters,pmremGenerator,renderTarget,sun});
    // }

    // }
    // updateSun({parameters,pmremGenerator,renderTarget,sun}:any){
    //     if(this.water&&this.scene&&this.sky){
    //         const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    //         const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    //         sun.setFromSphericalCoords( 1, phi, theta );

    //         this.sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    //         this.water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    //         if ( renderTarget !== undefined ) renderTarget.dispose();

    //         renderTarget = pmremGenerator.fromScene( this.sky );

    //         this.scene.environment = renderTarget.texture;
    //     }
    // }
    rotate(obj:any,xspead:any,yspead:any,zspead:any){
        obj.rotation.x += xspead;
        obj.rotation.y += yspead;
        obj.position.y += zspead
    }
    render(): void {
        this.time+=0.02
        if (this.renderer && this.scene && this.camera && this.controls && this.water) {
            this.rotate(this.cubeBox,0.01,0.01,Math.cos(this.time))
            requestAnimationFrame( this.render.bind(this) );
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

        }

    }
}

export default ThreeIsland