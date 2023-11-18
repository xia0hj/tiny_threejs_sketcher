import { SceneTool } from '@/common/type'
import { GlobalContext } from '@/feature/global_context'
import { SceneObject } from '@/feature/scene_object'
import { Camera, Intersection, Raycaster, Vector2 } from 'three'

export class SceneController implements SceneTool {
  raycaster: Raycaster
  onPointerMove: (event: MouseEvent) => void

  init() {
    this.raycaster = new Raycaster()

    let lastIntersectObjectList: Intersection<SceneObject>[] = []

    this.onPointerMove = (event) => {
      const pointer = new Vector2(
        (event.offsetX / window.innerWidth) * 2 - 1,
        -(event.offsetY / window.innerHeight) * 2 + 1,
      )
      this.raycaster.setFromCamera(
        pointer,
        GlobalContext.sceneViewer?.camera as Camera,
      )

      const allSceneObject =
        GlobalContext.sceneViewer?.sceneObjectGroup.children
      if (!Array.isArray(allSceneObject)) {
        return
      }
      const intersectObjectList =
        this.raycaster.intersectObjects<SceneObject>(allSceneObject)

      const removedObjectList = lastIntersectObjectList.filter(
        (lastIntersectObject) =>
          intersectObjectList.findIndex(
            (intersectObject) =>
              intersectObject.object === lastIntersectObject.object,
          ) === -1,
      )

      const newHoverObjectList = intersectObjectList.filter(
        (intersectObject) =>
          lastIntersectObjectList.findIndex(
            (lastIntersectObject) =>
              lastIntersectObject.object === intersectObject.object,
          ) === -1,
      )
      
      if(removedObjectList.length >0 || newHoverObjectList.length>0){
        console.log('onPointerMove', {
          removedObjectList,
          newHoverObjectList
        });
      }

      

      removedObjectList.forEach(removedObject => removedObject.object.onMouseLeave())
      newHoverObjectList.forEach(newHoverObject => newHoverObject.object.onMouseEnter())

      lastIntersectObjectList = intersectObjectList
    }
    window.addEventListener('pointermove', this.onPointerMove)
  }

  dispose() {
    window.removeEventListener('pointermove', this.onPointerMove)
  }
}
