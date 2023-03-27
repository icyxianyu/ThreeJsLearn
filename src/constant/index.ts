import * as THREE from "three"
const position = [0, 0, 0];
const materialOption = { color: 0xcccccc };
const Material = "MeshBasicMaterial";
const length = 12, width = 8;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
    steps: 2,
    depth: 16,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
};


const points = [];
for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
}


const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);


export const ThreeNodes = [

    {
        name: "BoxGeometry" ,
        CName:"立方缓冲几何体",

        geometory: "BoxGeometry",
        geoOption: [10, 10, 10],
        Material: "MeshBasicMaterial",
        materialOption,
        position,
    },
    {
        name: "CircleGeometry" ,
        CName:"圆形缓冲几何体",
        geometory: "CircleGeometry",
        geoOption: [5, 32],
        Material,
        materialOption,
        position,
    },
    {
        name: "ConeGeometry" ,
        CName:"圆锥缓冲几何体",
        geometory: "ConeGeometry",
        geoOption: [5, 20, 32],
        Material,
        materialOption,
        position,
    },
    {
        name: "CylinderGeometry" ,
        CName:"圆柱缓冲几何体",
        geometory: "CylinderGeometry",
        geoOption: [5, 5, 20, 32],
        Material,
        materialOption,
        position,
    },
    {
        name: "ExtrudeGeometry" ,
        CName:"挤压缓冲几何体",
        geometory: "ExtrudeGeometry",
        geoOption: [shape, extrudeSettings],
        Material,
        materialOption,
        position,
    },

    {
        name: "LatheGeometry" ,
        CName:"车削缓冲几何体",
        geometory: "LatheGeometry",
        geoOption: [points],
        Material,
        materialOption,
        position,

    },

    {
        name: "PlaneGeometry" ,
        CName:"平面缓冲几何体",
        geometory: "LatheGeometry",
        geoOption: [1, 1],
        Material,
        materialOption,
        position,
    },

    {
        name: "RingGeometry" ,
        CName:"圆环缓冲几何体",
        geometory: "RingGeometry",
        geoOption: [1, 5, 32],
        Material: Object.assign({side: THREE.DoubleSide },Material),
        materialOption,
        position,
    },
    {
        name: "ShapeGeometry" ,
        CName:"形状缓冲几何体",
        geometory: "ShapeGeometry",
        geoOption: [heartShape],
        Material,
        materialOption,
        position,
    },
    {
        name: "SphereGeometry" ,
        CName:"球缓冲几何体",
        geometory: "SphereGeometry",
        geoOption: [15, 32, 16],
        Material,

        materialOption,
        position,
    },

    {
        name: "TorusGeometry" ,
        CName:"圆环缓冲几何体",
        geometory: "TorusGeometry",
        geoOption: [10, 3, 16, 100],
        materialOption,
        Material,

        position,
    },
    {
        name: "TorusKnotGeometry",
        CName:"圆环缓冲扭结几何体",
        geometory: "TorusKnotGeometry",
        geoOption: [10, 3, 100, 16],
        materialOption,
        Material,

        position,
    },


]

const unUsual = [{
    name: "DodecahedronGeometry"
},
{
    name: "EdgesGeometry"
}, {
    name: "IcosahedronGeometry"
},
{
    name: "OctahedronGeometry"
},
{
    name: "PolyhedronGeometry"
}, {
    name: "TetrahedronGeometry"
},
{
    name: "TubeGeometry"
}
    , {
    name: "WireframeGeometry"
}]