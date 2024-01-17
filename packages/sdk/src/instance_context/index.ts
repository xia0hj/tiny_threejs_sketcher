import { CommandSystem } from "@src/command_system";
import {
  ReactiveStore,
  getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
import { SceneRenderer } from "@src/scene_renderer";
import { SketchObjectManager } from "@src/sketch_object_manager";

export class InstanceContext {
  public sceneUuid: string;
  public reactiveStore: ReactiveStore;
  public sceneRenderer: SceneRenderer;
  public commandSystem: CommandSystem;
  public sketchObjectManager: SketchObjectManager;

  constructor({
    sceneUuid,
    sceneRenderer,
    externalReactiveStore,
  }: {
    sceneUuid: string;
    sceneRenderer: SceneRenderer;
    externalReactiveStore?: ReactiveStore;
  }) {
    this.sceneUuid = sceneUuid;
    this.sceneRenderer = sceneRenderer;
    this.reactiveStore = externalReactiveStore ?? getDefaultReactiveStore();
    this.commandSystem = new CommandSystem(this);
    this.sketchObjectManager = new SketchObjectManager(
      this,
      sceneRenderer.scene,
    );

    instanceContextMap.set(sceneUuid, this);
  }

  public dispose() {
    instanceContextMap.delete(this.sceneUuid)
  }
}

const instanceContextMap = new Map<string, InstanceContext>();

export function getInstanceContext(sceneUuid?: string) {
  if (sceneUuid == null) {
    if (instanceContextMap.size === 1) {
      const [ctx] = instanceContextMap.values();
      return ctx;
    } else {
      throw new Error("require scene uuid to get instance context.");
    }
  }

  return instanceContextMap.get(sceneUuid);
}

