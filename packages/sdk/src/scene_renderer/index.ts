import { CommandSystem } from "@src/command_system";
import { AXES_HELPER_LINE_LENGTH, SCENE_BACKGROUND_COLOR } from "@src/constant";
import {
    deleteInstanceContext,
    getInstanceContext,
} from "@src/instance_context";
import {
    ReactiveStore,
    getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
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
    sketchObjectGroup: Group;

    renderer: WebGLRenderer;

    light: Light;

    orbitControls: OrbitControls;

    currentCamera: PerspectiveCamera | OrthographicCamera;
    perspectiveCamera: PerspectiveCamera;
    orthographicCamera: OrthographicCamera;

    private requestAnimationFrameId: number = 0;

    constructor(
        canvasElement: HTMLCanvasElement,
        reactiveStore?: ReactiveStore,
    ) {
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

        // others
        this.canvasElement.addEventListener("resize", () => {
            this.onCanvasResize();
        });
        this.animate();
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
