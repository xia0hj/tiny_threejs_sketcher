import { SCENE_VIEWER_BACKGROUND_COLOR } from '@/common/constant';
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Object3D,
  AxesHelper,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneViewer {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  control: OrbitControls

  isRendering: boolean

  addObject3D(object3d: Object3D){
    this.scene.add(object3d)
  }

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
    this.renderer.setClearColor(SCENE_VIEWER_BACKGROUND_COLOR)
    sceneContainer.appendChild(this.renderer.domElement)
    window.addEventListener('resize', this.onWindowResize)

    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.update()

    this.scene.add(new AxesHelper(5))

    this.camera.position.z = 5

    this.startRender()
  }

  dispose() {
    this.isRendering = false
    window.removeEventListener('resize', this.onWindowResize)
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

  private startRender() {
    const animate = () => {
      if (!this.isRendering) {
        return
      }
      requestAnimationFrame(animate)
      this.control.update()
      this.renderer.render(this.scene, this.camera)
    }
    this.isRendering = true
    animate()
  }



  private onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}
