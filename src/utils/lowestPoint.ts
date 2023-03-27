import * as THREE from "three"
export const  getMeshLowestToCenterLength   = (mesh:any): number =>{
    // 获取Mesh的边界框
    const boundingBox = new THREE.Box3().setFromObject(mesh);
  
    // 获取Mesh的中心点
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
  
    // 获取Mesh的最低点;
    const lowestY = boundingBox.min.y;

    // 计算中心点和最低点之间的距离
    const distance = Math.abs(center.y - lowestY);
  
    return distance;
  }
  