import { SCENE_PLANE_COLOR, SCENE_PLANE_LENGTH } from '@/common/constant'
import { Command } from '@/feature/command_system'
import { GlobalContext } from '@/feature/global_context'
import { GraphicObject } from '@/feature/scene_object'
import { off } from 'process'
import {
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Vector3,
} from 'three'

export type CreatePlaneParameter = {
  parallelTo: 'XY' | 'XZ' | 'YZ'
  offset: number
}
export const CREATE_PLANE_COMMAND = 'create_plane'
export const createPlaneCommand: Command = {
  key: CREATE_PLANE_COMMAND,
  run(createPlaneParameter: CreatePlaneParameter) {
    const plane = new Plane(createPlaneParameter)
    const sceneViewer = GlobalContext.getSceneViewer()
    sceneViewer?.addObject3D(plane.object)
  },
}

export class Plane implements GraphicObject {
  object: Mesh
  id: string



  constructor(createPlaneParameter: CreatePlaneParameter) {
    const mesh = new Mesh(
      buildPlaneGeomtry(createPlaneParameter, SCENE_PLANE_LENGTH),
      new MeshBasicMaterial({
        color: SCENE_PLANE_COLOR,
        side: DoubleSide,
      }),
    )
    this.object = mesh
    this.id = mesh.uuid
  }

  private _isSelected: boolean = false
  get isSelected(){
    return this._isSelected
  }
  set isSelected(val){
    this._isSelected = val
  }
}

export function buildPlaneGeomtry({ parallelTo, offset }: CreatePlaneParameter, planeLength: number): BufferGeometry {
  const distance = planeLength / 2
  if (parallelTo === 'XY') {
    const minPosition = new Vector3(-distance, -distance, offset)
    const maxPosition = new Vector3(distance, distance, offset)
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(maxPosition.x, minPosition.y, offset), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(minPosition.x, maxPosition.y, offset), // 左上
      new Vector3().copy(minPosition), // 左下
    ])
  } else if (parallelTo === 'XZ') {
    const minPosition = new Vector3(-distance, offset, -distance)
    const maxPosition = new Vector3(distance, offset, distance)
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(maxPosition.x, offset, minPosition.z), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(minPosition.x, offset, maxPosition.z), // 左上
      new Vector3().copy(minPosition), // 左下
    ])
  } else {
    const minPosition = new Vector3(offset, -distance, -distance)
    const maxPosition = new Vector3(offset, distance, distance)
    return new BufferGeometry().setFromPoints([
      new Vector3().copy(minPosition), // 左下
      new Vector3(offset, maxPosition.y, minPosition.z), // 右下
      new Vector3().copy(maxPosition), // 右上
      new Vector3().copy(maxPosition), // 右上
      new Vector3(offset, minPosition.y, maxPosition.z), // 左上
      new Vector3().copy(minPosition), // 左下
    ])
  }
}
