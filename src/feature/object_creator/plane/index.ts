import { PLANE_COLOR } from "@/common/constant";
import { Command } from "@/feature/command_system";
import { GlobalContext } from "@/feature/global_context";
import { DoubleSide, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";

export type createPlaneParameter = {
  parallelTo: 'XY'|'XZ'|'YZ',
  offset: number,
}
export const CREATE_PLANE_COMMAND = 'CREATE_PLANE_COMMAND'
export const createPlaneCommand: Command = {
  key: CREATE_PLANE_COMMAND,
  run({parallelTo, offset}:createPlaneParameter){

    
    const plane = new Mesh(
      new PlaneGeometry(3,3),
      new MeshBasicMaterial({
        color: PLANE_COLOR,
        side: DoubleSide
      })
    )

    const sceneViewer = GlobalContext.getSceneViewer()
    sceneViewer?.addObject3D(plane)
  }
}