
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three"
export class ThreeInit{

    element:HTMLElement
    el: DOMRect;
    scene!: THREE.Scene | null;
    camera!: THREE.PerspectiveCamera | null  ;
    renderer!: THREE.WebGLRenderer | null;
    controls: OrbitControls | undefined;
    
    constructor(element:HTMLElement){
        this.element = element
        this.el = element.getBoundingClientRect();
        this.init()
    }

    init():void{
        this.scene = new THREE.Scene();
        this.setCamera();
        this.setRenderer();
        this.control();
        
    
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
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
    }
    control():void{
        if(this.camera&&this.renderer){
            this.controls = new OrbitControls(this.camera,this.renderer.domElement);
            this.controls.maxPolarAngle = Math.PI * 0.495;

            this.controls.update();
        }
    }
    onWindowResize():void{
        if(this.camera&&this.el&&this.renderer&&this.scene){
            this.el = this.element.getBoundingClientRect();
            this.camera.aspect = this.el.width / this.el.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( this.el.width, this.el.height );
            this.renderer.render(this.scene, this.camera); // 添加此行代码
        }
    }
    observe(element:HTMLElement):void{
        const observe = new ResizeObserver(()=>{
            this.onWindowResize();
        })
        observe.observe(element);

    }
    
      // 创建网格模型
    appendChild():void{
        if(this.renderer){
            this.element.appendChild(this.renderer.domElement)

        }
    }
}
