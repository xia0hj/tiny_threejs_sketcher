import { AXES_HELPER_LINE_LENGTH, SCENE_BACKGROUND_COLOR } from "@src/constant";
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

export class SceneRenderer {
    canvasElement: HTMLCanvasElement;

    scene: Scene;
    sceneObjectGroup: Group;

    renderer: WebGLRenderer;

    light: Light;

    orbitControls: OrbitControls;

    currentCamera: PerspectiveCamera | OrthographicCamera;
    perspectiveCamera: PerspectiveCamera;
    orthographicCamera: OrthographicCamera;

    private requestAnimationFrameId: number = 0;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
    }

    public start() {
        const canvasWidth = this.canvasElement.clientWidth;
        const canvasHeight = this.canvasElement.clientHeight;

        // scene
        this.scene = new Scene();
        this.sceneObjectGroup = new Group();
        this.scene.add(this.sceneObjectGroup);
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
            75,
            canvasWidth / canvasHeight,
            0.1,
            1000,
        );
        this.currentCamera = this.perspectiveCamera;
        this.currentCamera.position.z = 5;

        // control
        this.orbitControls = new OrbitControls(
            this.currentCamera,
            this.canvasElement,
        );
        // this.orbitControls.update()

        // others
        this.canvasElement.addEventListener("resize", this.onCanvasResize);
        this.animate();
    }

    public dispose(){
        window.cancelAnimationFrame(this.requestAnimationFrameId)
        this.canvasElement.removeEventListener('resize', this.onCanvasResize)
    }

    private animate = () => {
        this.requestAnimationFrameId = window.requestAnimationFrame(
            this.animate,
        );
        this.orbitControls.update();
        this.renderer.render(this.scene, this.currentCamera);
    }

    private onCanvasResize = () => {
        window.cancelAnimationFrame(this.requestAnimationFrameId);
    };
}
