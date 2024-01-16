import { CommandSystem } from "@src/command_system";
import {
  ReactiveStore,
  getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
import { SceneRenderer } from "@src/scene_renderer";
import { SketchObjectManager } from "@src/sketch_object_manager";

export type InstanceContext = {
  reactiveStore: ReactiveStore;
  sceneRenderer: SceneRenderer;
  commandSystem: CommandSystem;
  sketchObjectManager: SketchObjectManager;
};

export function createInstanceContext({
  sceneUuid,
  sceneRenderer,
  externalReactiveStore,
}: {
  sceneUuid: string;
  sceneRenderer: SceneRenderer;
  externalReactiveStore?: ReactiveStore;
}): InstanceContext {
  const context: any = {};
  context.sceneRenderer = sceneRenderer;
  context.reactiveStore = externalReactiveStore ?? getDefaultReactiveStore();
  context.commandSystem = new CommandSystem(context);
  context.sketchObjectManager = new SketchObjectManager(
    context,
    sceneRenderer.scene,
  );

  instanceContextMap.set(sceneUuid, context);

  return context as InstanceContext;
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

export function deleteInstanceContext(sceneUuid: string) {
  instanceContextMap.delete(sceneUuid);
}
