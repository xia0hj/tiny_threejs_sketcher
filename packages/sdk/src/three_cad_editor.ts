import {
  AXES_HELPER_LINE_LENGTH,
  SCENE_BACKGROUND_COLOR,
} from "@src/constant/config";
import { CommandSystem } from "@src/features/command_system";
import { createGlobalStore } from "@src/features/global_store";
import { OperationModeSwitcher } from "@src/features/operation_mode_switcher";
import { SketchObjectManager } from "@src/features/sketch_object_manager";
import { COMMAND_KEY } from "@src/index";
import {
  AmbientLight,
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Color,
  Light,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type ThreeCadEditorProps = {
  canvasElement: HTMLCanvasElement;
};

export class ThreeCadEditor {
  canvasElement: HTMLCanvasElement;
  scene: Scene = new Scene();
  light: Light;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera | OrthographicCamera;
  perspectiveCamera: PerspectiveCamera;
  orthographicCamera: OrthographicCamera;
  orbitControls: OrbitControls;

  commandSystem: CommandSystem;
  globalStore;
  sketchObjectManager: SketchObjectManager;
  operationModeSwitcher: OperationModeSwitcher;

  private requestAnimationFrameId: number = 0;
  private eventAbortController: AbortController = new AbortController();

  constructor({ canvasElement }: ThreeCadEditorProps) {
    this.canvasElement = canvasElement;

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

    // init feature
    this.globalStore = createGlobalStore();
    this.globalStore.subscribe(
      (state) => state.sketcher2dBasePlane,
      () => this.operationModeSwitcher.resetOperationMode(),
    );
    this.sketchObjectManager = new SketchObjectManager(this);
    this.commandSystem = new CommandSystem(this);
    this.commandSystem.runCommand(COMMAND_KEY.fit_camera_to_scene);
    this.operationModeSwitcher = new OperationModeSwitcher(this);

    this.animate();
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
}
