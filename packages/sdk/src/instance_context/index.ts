import { CommandSystem } from "@src/command_system";
import {
  ReactiveStore,
  getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
import { SceneRenderer } from "@src/scene_renderer";
import { SketchObjectManager } from "@src/sketch_object/sketch_object_manager";

export class InstanceContext {
  public reactiveStore: ReactiveStore;
  public sceneRenderer: SceneRenderer;
  public commandSystem: CommandSystem;
  public sketchObjectManager: SketchObjectManager;

  constructor({
    sceneRenderer,
    externalReactiveStore,
  }: {
    sceneRenderer: SceneRenderer;
    externalReactiveStore?: ReactiveStore;
  }) {
    this.sceneRenderer = sceneRenderer;
    this.reactiveStore = externalReactiveStore ?? getDefaultReactiveStore();
    this.commandSystem = new CommandSystem(this);
    this.sketchObjectManager = new SketchObjectManager(
      this,
      sceneRenderer.scene,
    );
  }

  public dispose() {
  }
}
