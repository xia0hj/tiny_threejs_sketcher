import {
  AXES_HELPER_LENGTH,
  SCENE_VIEWER_BACKGROUND_COLOR,
} from "@/common/constant";
import { SceneTool } from "@/common/type";
import { GlobalContext } from "@/feature/global_context";
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Mesh,
  Object3D,
  AxesHelper,
  Group,
  AmbientLight,
  Light,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class SceneViewer implements SceneTool {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  control: OrbitControls;
  sceneObjectGroup: Group;
  light: Light;

  isActive: boolean = false;
  isRendering: boolean = false;

  public addSceneObject(object3d: Object3D) {
    this.sceneObjectGroup.add(object3d);
  }

  public init(sceneContainer: HTMLDivElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(SCENE_VIEWER_BACKGROUND_COLOR);
    sceneContainer.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);

    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.update();

    this.scene.add(new AxesHelper(AXES_HELPER_LENGTH));

    this.sceneObjectGroup = new Group();
    this.scene.add(this.sceneObjectGroup);

    this.camera.position.z = 5;

    this.light = new AmbientLight(0x404040);
    this.scene.add(this.light);

    this.startRender();

    this.isActive = true;
  }

  public dispose() {
    this.isRendering = false;
    window.removeEventListener("resize", this.onWindowResize);
    this.renderer.domElement.remove();
    this.scene.traverse((object3d) => {
      if (object3d instanceof Mesh) {
        object3d.material?.texture?.dispose?.();
        object3d.material?.dispose?.();
        object3d.geometry?.dispose?.();
      }
      object3d.clear();
    });
    this.camera.clear();
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();

    this.isActive = false;
  }

  private startRender() {
    const animate = () => {
      if (!this.isRendering) {
        return;
      }
      requestAnimationFrame(animate);
      this.control.update();
      this.renderer.render(this.scene, this.camera);
      GlobalContext.sceneController?.highlightHoverObject();
    };

    this.isRendering = true;
    animate();
  }

  private onWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}
