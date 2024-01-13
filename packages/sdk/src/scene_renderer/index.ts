import { CommandSystem } from "@src/command_system";
import {
  AXES_HELPER_LINE_LENGTH,
  SCENE_BACKGROUND_COLOR,
} from "@src/constant/config";
import { CAMERA_TYPE } from "@src/constant/enum";
import {
  deleteInstanceContext,
  getInstanceContext,
} from "@src/instance_context";
import {
  ReactiveStore,
  getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
import { SketchObject } from "@src/sketch_object/type";
import { ValueOf } from "@src/util";
import {
  AmbientLight,
  AxesHelper,
  Box3,
  Group,
  Light,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Sphere,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class SceneRenderer {
  canvasElement: HTMLCanvasElement;

  scene: Scene;
  sketchObjectGroup: Group;

  renderer: WebGLRenderer;

  light: Light;

  orbitControls: OrbitControls;

  currentCamera: PerspectiveCamera | OrthographicCamera;
  perspectiveCamera: PerspectiveCamera;
  orthographicCamera: OrthographicCamera;

  private requestAnimationFrameId: number = 0;

  constructor(canvasElement: HTMLCanvasElement, reactiveStore?: ReactiveStore) {
    this.canvasElement = canvasElement;
    this.scene = new Scene();

    const context = getInstanceContext(this.scene.uuid);
    context.reactiveStore = reactiveStore ?? getDefaultReactiveStore();
    context.sceneRenderer = this;
    context.commandSystem = new CommandSystem(this.scene.uuid);
  }

  public start() {
    const canvasWidth = this.canvasElement.clientWidth;
    const canvasHeight = this.canvasElement.clientHeight;

    // scene
    this.sketchObjectGroup = new Group();
    this.scene.add(this.sketchObjectGroup);
    this.scene.add(new AxesHelper(AXES_HELPER_LINE_LENGTH));

    // light
    this.light = new AmbientLight();
    this.scene.add(this.light);

    // renderer
    const renderer = new WebGLRenderer({ canvas: this.canvasElement });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(SCENE_BACKGROUND_COLOR);
    this.renderer = renderer;

    // camera
    this.perspectiveCamera = new PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      0.1,
      1000,
    );
    this.orthographicCamera = new OrthographicCamera(
      canvasWidth / -2,
      canvasWidth / 2,
      canvasHeight / 2,
      canvasHeight / -2,
      0,
      1000,
    );
    this.currentCamera = this.perspectiveCamera;

    // control
    this.orbitControls = new OrbitControls(
      this.currentCamera,
      this.canvasElement,
    );

    // others
    this.canvasElement.addEventListener("resize", () => {
      this.onCanvasResize();
    });
    this.fitCameraToScene();
    this.animate();
  }

  public setCameraType(targetType: ValueOf<typeof CAMERA_TYPE>) {
    const store = getInstanceContext(this.scene.uuid).reactiveStore;
    const curType = store?.getReactiveState("currentCameraType");

    if (curType === targetType) {
      return;
    }

    if (targetType === CAMERA_TYPE.perspectiveCamera) {
      this.currentCamera = this.perspectiveCamera;
      store?.setReactiveState(
        "currentCameraType",
        CAMERA_TYPE.perspectiveCamera,
      );
    } else if (targetType === CAMERA_TYPE.orthographicCamera) {
      this.currentCamera = this.orthographicCamera;
      store?.setReactiveState(
        "currentCameraType",
        CAMERA_TYPE.orthographicCamera,
      );
    }
    this.fitCameraToScene();
  }

  public fitCameraToScene() {
    if (this.sketchObjectGroup.children.length === 0) {
      this.currentCamera.position.set(5, 5, 5);
      this.orbitControls.target.set(0, 0, 0);
      return;
    }

    const boundingSphere = new Box3()
      .setFromObject(this.sketchObjectGroup)
      .getBoundingSphere(new Sphere());

    const currentCameraType = getInstanceContext(
      this.scene.uuid,
    ).reactiveStore?.getReactiveState("currentCameraType");
    if (currentCameraType === CAMERA_TYPE.perspectiveCamera) {
      const fov = (this.perspectiveCamera.fov * Math.PI) / 180;
      const distance = boundingSphere.radius / Math.sin(fov / 2);
      this.perspectiveCamera.position.set(
        boundingSphere.center.x + distance,
        boundingSphere.center.y + distance,
        boundingSphere.center.z + distance,
      );
      this.perspectiveCamera.zoom = 0.9;
      this.orbitControls.target = boundingSphere.center;
    } else if (currentCameraType === CAMERA_TYPE.orthographicCamera) {
      const cameraWidth =
        this.orthographicCamera.right - this.orthographicCamera.left;
      const cameraHeight =
        this.orthographicCamera.top - this.orthographicCamera.bottom;
      if (cameraWidth >= cameraHeight) {
        this.orthographicCamera.top = boundingSphere.radius;
        this.orthographicCamera.bottom = -boundingSphere.radius;
        this.orthographicCamera.left =
          -boundingSphere.radius * (cameraWidth / cameraHeight);
        this.orthographicCamera.right =
          boundingSphere.radius * (cameraWidth / cameraHeight);
      } else {
        this.orthographicCamera.left = -boundingSphere.radius;
        this.orthographicCamera.right = boundingSphere.radius;
        this.orthographicCamera.top =
          boundingSphere.radius * (cameraHeight / cameraWidth);
        this.orthographicCamera.bottom =
          -boundingSphere.radius * (cameraHeight / cameraWidth);
      }
      this.orthographicCamera.position.set(
        boundingSphere.center.x + boundingSphere.radius,
        boundingSphere.center.y + boundingSphere.radius,
        boundingSphere.center.z + boundingSphere.radius,
      );
      this.orthographicCamera.zoom = 0.9;
      this.orbitControls.target = boundingSphere.center;
    }
  }

  public addSketchObjectToScene(sketchObject: SketchObject) {
    this.sketchObjectGroup.add(sketchObject);
    this.fitCameraToScene();
  }

  public dispose() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.canvasElement.removeEventListener("resize", this.onCanvasResize);
    deleteInstanceContext(this.scene.uuid);
  }

  private animate() {
    this.requestAnimationFrameId = window.requestAnimationFrame(() => {
      this.animate();
    });
    this.orbitControls.update();
    this.renderer.render(this.scene, this.currentCamera);
  }

  private onCanvasResize() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }
}
