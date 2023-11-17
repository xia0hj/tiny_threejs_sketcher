import { SceneTool } from '@/common/type'
import { GlobalContext } from '@/feature/global_context'
import { SceneObject } from '@/feature/scene_object'
import { Camera, Raycaster, Vector2 } from 'three'

export class SceneController implements SceneTool {
  raycaster: Raycaster
  onPointerMove: (event: MouseEvent) => void

  init() {
    this.raycaster = new Raycaster()
    this.onPointerMove = (event) => {
      const pointer = new Vector2(
        (event.offsetX / window.innerWidth) * 2 - 1,
        -(event.offsetY / window.innerHeight) * 2 + 1,
      )
      this.raycaster.setFromCamera(
        pointer,
        GlobalContext.sceneViewer?.camera as Camera,
      )

      const objects: any = GlobalContext.sceneViewer?.sceneObjectGroup.children
      const intersects = this.raycaster.intersectObjects<SceneObject>(objects)


      for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000)
      }
    }
    window.addEventListener('pointermove', this.onPointerMove)
  }

  dispose() {
    window.removeEventListener('pointermove', this.onPointerMove)
  }
}
