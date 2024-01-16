import { CommandSystem } from "@src/command_system";
import {
  ReactiveStore,
  getDefaultReactiveStore,
} from "@src/instance_context/reactive_state";
import { SceneRenderer } from "@src/scene_renderer";

export type InstanceContext = {
  reactiveStore: ReactiveStore;
  sceneRenderer: SceneRenderer;
  commandSystem: CommandSystem;
};

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

export function createInstanceContext({
  sceneUuid,
  sceneRenderer,
  externalReactiveStore,
}: {
  sceneUuid: string;
  sceneRenderer: SceneRenderer;
  externalReactiveStore?: ReactiveStore;
}) {
  const context: Partial<InstanceContext> = {};
  context.sceneRenderer = sceneRenderer;
  context.reactiveStore = externalReactiveStore ?? getDefaultReactiveStore();

  return context as InstanceContext;
}
