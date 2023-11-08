import { Command } from "@/feature/command_system";
import { GlobalContext } from "@/feature/global_context";
import { Object3D } from "three";

export type createPlaneParameter = {
  parallelTo: 'XY'|'XZ'|'YZ',
  offset: number,
}
export const CREATE_PLANE_COMMAND = 'CREATE_PLANE_COMMAND'
export const createPlaneCommand: Command = {
  key: CREATE_PLANE_COMMAND,
  run({parallelTo, offset}:createPlaneParameter){

    const plane = new Object3D() // #todo

    const sceneViewer = GlobalContext.getSceneViewer()
    sceneViewer?.addObject3D(plane)
  }
}