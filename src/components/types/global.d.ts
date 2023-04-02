interface createCube {
    geometory: keyof typeof THREE,
    geoOption: Array<any>,
    Material: keyof typeof THREE,
    materialOption: any,
    position: Array<number>,
  }
declare interface AnyObj {
    [key: string]: any;
}
interface State{
  canvasInstance:any,
  clickNode:any,
  clickInstance:any,
  clickInstances:AnyObj,
  originInstances:any;
  appendNode:any
  originInstancesObject:any
}