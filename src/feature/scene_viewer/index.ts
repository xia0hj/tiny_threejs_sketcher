import { messageManager } from '@/util/message_managet'
import {
  Camera,
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'

export class SceneViewer {
  scene: Scene
  camera: Camera
  renderer: WebGLRenderer

  isRendering: boolean



  init(sceneContainer: HTMLDivElement) {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )

    this.renderer = new WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    sceneContainer.appendChild(this.renderer.domElement)

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    this.scene.add(cube)

    this.camera.position.z = 5

    this.startRender()
  }

  startRender(){
    const animate = () => {
      if(!this.isRendering){
        return
      }
      requestAnimationFrame(animate)
      this.renderer.render( this.scene, this.camera );
    }
    this.isRendering = true
    animate()
  }

  dispose() {
    this.isRendering = false
    this.renderer.domElement.remove()
    this.scene.traverse((object3d) => {
      if (object3d instanceof Mesh) {
        object3d.material?.texture?.dispose?.()
        object3d.material?.dispose?.()
        object3d.geometry?.dispose?.()
      }
      object3d.clear()
    })
    this.camera.clear()
    this.scene.clear()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }
}
