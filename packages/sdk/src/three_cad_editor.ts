import {
  AXES_HELPER_LINE_LENGTH,
  SCENE_BACKGROUND_COLOR,
} from "@src/constant/config";
import { CommandSystem } from "@src/feature/base/command_system";
import { GlobalStore } from "@src/feature/base/global_store";
import {
  AmbientLight,
  AxesHelper,
  Group,
  Light,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type ThreeCadEditorProps = {
  canvasElement: HTMLCanvasElement;
};

export class ThreeCadEditor {
  canvasElement: HTMLCanvasElement;
  scene: Scene = new Scene();
  sketchObjectGroup: Group = new Group();
  light: Light;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera | OrthographicCamera;
  perspectiveCamera: PerspectiveCamera;
  orthographicCamera: OrthographicCamera;
  orbitControls: OrbitControls;

  commandSystem: CommandSystem;
  globalStore: GlobalStore;

  private requestAnimationFrameId: number = 0;
  private eventAbortController: AbortController = new AbortController();

  constructor({ canvasElement }: ThreeCadEditorProps) {
    this.canvasElement = canvasElement;
    this.scene.add(this.sketchObjectGroup);

    // init base feature
    this.globalStore = new GlobalStore();
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

    this.animate();
  }

  private animate() {
    this.requestAnimationFrameId = window.requestAnimationFrame(() => {
      this.animate();
    });
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
