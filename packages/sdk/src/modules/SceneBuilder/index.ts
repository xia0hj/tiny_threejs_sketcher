import {
  AXES_HELPER_LINE_LENGTH,
  SCENE_BACKGROUND_COLOR,
} from "@src/constant/config";
import { MODULE_NAME, Module, ModuleNameUnion } from "@src/modules";
import {
  AmbientLight,
  AxesHelper,
  Camera,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class SceneBuilder implements Module {
  name = MODULE_NAME.SceneBuilder;
  dependencies = [];

  scene = new Scene();

  perspectiveCamera = new PerspectiveCamera();
  orthographicCamera = new OrthographicCamera();
  camera = this.perspectiveCamera;

  orbitControls = new OrbitControls(this.camera);

  renderer?: WebGLRenderer;

  install() {
    this.scene.add(new AxesHelper(AXES_HELPER_LINE_LENGTH));
    this.scene.add(new AmbientLight());
  }

  startRender(canvasElement: HTMLCanvasElement) {
    const canvasWidth = canvasElement.clientWidth;
    const canvasHeight = canvasElement.clientHeight;

    this.renderer = new WebGLRenderer({ canvas: canvasElement });
    this.renderer.setSize(canvasWidth, canvasHeight);
    this.renderer.setClearColor(SCENE_BACKGROUND_COLOR);

    this.perspectiveCamera.fov = 45;
    this.perspectiveCamera.aspect = canvasWidth / canvasHeight;
    this.perspectiveCamera.near = 0.1;
    this.perspectiveCamera.far = 1000;

    this.orthographicCamera.left = canvasWidth / -2;
    this.orthographicCamera.right = canvasWidth / 2;
    this.orthographicCamera.top = canvasHeight / 2;
    this.orthographicCamera.bottom = canvasHeight / -2;
    this.orthographicCamera.near = 0;
    this.orthographicCamera.far = 1000;

    this.orbitControls.domElement = this.renderer.domElement;

    this.animate();
  }

  dispose() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  requestAnimationFrameId = 0;
  private animate() {
    this.requestAnimationFrameId = window.requestAnimationFrame(() => {
      this.animate();
    });
    this.orbitControls.update();
    this.renderer?.render(this.scene, this.camera);
  }
}
