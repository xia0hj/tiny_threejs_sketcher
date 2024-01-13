import { CommandSystem } from "@src/command_system";
import { ReactiveStore } from "@src/instance_context/reactive_state";
import { SceneRenderer } from "@src/scene_renderer";

export type InstanceContext = {
  reactiveStore?: ReactiveStore;
  sceneRenderer?: SceneRenderer;
  commandSystem?: CommandSystem;
};

const instanceContextMap = new Map<string, InstanceContext>();

export function getInstanceContext(sceneUuid: string) {
  let context = instanceContextMap.get(sceneUuid);
  if (context == null) {
    context = {};
    instanceContextMap.set(sceneUuid, context);
  }
  return context;
}

export function deleteInstanceContext(sceneUuid: string) {
  instanceContextMap.delete(sceneUuid);
}
