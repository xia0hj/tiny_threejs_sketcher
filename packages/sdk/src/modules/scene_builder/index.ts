import { MODULE_NAME, Module, ModuleGetter } from "@src/modules";
import { COMMAND_KEY } from "@src/modules/command_system/all_commands";
import { Options } from "@src/modules/configurator";
import { ThreeCadEditor } from "@src/three_cad_editor";
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

  getModule: ModuleGetter;

  canvasElement: HTMLCanvasElement;
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera | OrthographicCamera;
  perspectiveCamera: PerspectiveCamera;
  orthographicCamera: OrthographicCamera;
  orbitControls: OrbitControls;

  constructor(getModule: ModuleGetter, canvasElement: HTMLCanvasElement) {
    this.getModule = getModule;
    const options = this.getModule(MODULE_NAME.Configurator).getOptions();

    this.canvasElement = canvasElement;
    const canvasWidth = this.canvasElement.clientWidth;
    const canvasHeight = this.canvasElement.clientHeight;

    this.scene = new Scene();
    this.scene.add(new AxesHelper(options.axesHelperLineLength));
    this.scene.add(new AmbientLight());

    // renderer
    const renderer = new WebGLRenderer({ canvas: this.canvasElement });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(options.sceneBackgroundColor);
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
  }

  startRender() {
    this.#animate();
  }

  dispose() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  requestAnimationFrameId = 0;
  #animate() {
    this.requestAnimationFrameId = window.requestAnimationFrame(() => {
      this.#animate();
    });
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
