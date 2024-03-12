import { CommandSystem } from "@src/command_system";
import {
  AXES_HELPER_LINE_LENGTH,
  SCENE_BACKGROUND_COLOR,
} from "@src/constant/config";
import { CAMERA_TYPE } from "@src/constant/enum";
import { GlobalStore } from "@src/global_store";
import { DefaultInputEventHandler } from "@src/input_event_handler/default";
import { InputEventHandler } from "@src/input_event_handler/interface";
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
  Raycaster,
  Scene,
  Sphere,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ThreeCadEditor {
  public canvasElement: HTMLCanvasElement;

  public scene: Scene;
  public sketchObjectGroup = new Group();

  private renderer: WebGLRenderer;

  public light: Light;

  public orbitControls: OrbitControls;

  public camera: PerspectiveCamera | OrthographicCamera;
  private perspectiveCamera: PerspectiveCamera;
  private orthographicCamera: OrthographicCamera;

  private requestAnimationFrameId: number = 0;
  private eventAbortController: AbortController = new AbortController();

  public globalStore: GlobalStore = new GlobalStore();
  public commandSystem: CommandSystem;

  raycaster = new Raycaster();

  public inputEventHandler: InputEventHandler = new DefaultInputEventHandler();

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement;
    this.scene = new Scene();
    this.scene.add(this.sketchObjectGroup);

    this.commandSystem = new CommandSystem(this);

    const canvasWidth = this.canvasElement.clientWidth;
    const canvasHeight = this.canvasElement.clientHeight;

    // AxesHelper
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
    this.camera = this.perspectiveCamera;

    // control
    this.orbitControls = new OrbitControls(this.camera, this.canvasElement);

    // others
    this.fitCameraToScene();
    this.animate();

    // listen input event
    this.canvasElement.addEventListener(
      "pointerdown",
      (event) => {
        this.inputEventHandler.onPointerdown?.(event, this);
      },
      { signal: this.eventAbortController.signal },
    );
    this.canvasElement.addEventListener(
      "pointermove",
      (event) => {
        this.inputEventHandler.onPointermove?.(event, this);
      },
      { signal: this.eventAbortController.signal },
    );
  }

  public setCameraType(targetType: ValueOf<typeof CAMERA_TYPE>) {
    if (this.globalStore.getState("currentCameraType") === targetType) {
      return;
    }

    if (targetType === CAMERA_TYPE.perspectiveCamera) {
      this.camera = this.perspectiveCamera;
      this.orbitControls.object = this.perspectiveCamera;
      this.globalStore.setState(
        "currentCameraType",
        CAMERA_TYPE.perspectiveCamera,
      );
    } else if (targetType === CAMERA_TYPE.orthographicCamera) {
      this.camera = this.orthographicCamera;
      this.orbitControls.object = this.orthographicCamera;
      this.globalStore.setState(
        "currentCameraType",
        CAMERA_TYPE.orthographicCamera,
      );
    }
    this.fitCameraToScene();
  }

  public fitCameraToScene() {
    const boundingSphere =
      this.sketchObjectGroup.children.length === 0
        ? new Sphere(new Vector3(0, 0, 0), AXES_HELPER_LINE_LENGTH)
        : new Box3()
            .setFromObject(this.sketchObjectGroup)
            .getBoundingSphere(new Sphere());

    const currentCameraType = this.globalStore.getState("currentCameraType");

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

  public dispose() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.eventAbortController.abort();
  }

  private animate() {
    this.requestAnimationFrameId = window.requestAnimationFrame(() => {
      this.animate();
    });
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onCanvasResize() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }
}
