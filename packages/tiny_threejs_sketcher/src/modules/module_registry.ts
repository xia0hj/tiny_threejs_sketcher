import { StateStore } from "@src/modules/state_store";
import { ControllerSwitcher } from "@src/modules/controller_switcher";
import { SceneBuilder } from "@src/modules/scene_builder";
import { SketchObjectManager } from "@src/modules/sketch_object_manager";

import { CommandExecutor } from "@src/modules/command_executor";
import { ValueOf } from "@src/utils";

// register modules here, then call useModule() in initAllModules
export const moduleNameDefinition = Object.freeze({
  SceneBuilder,
  StateStore,
  CommandExecutor,
  SketchObjectManager,
  ControllerSwitcher,
});
export function initAllModules(canvasElement: HTMLCanvasElement) {
  const moduleMap = new Map();
  const useModule = (module: ValueOf<ModuleNameMap>) =>
    moduleMap.set(module.name, module);
  const getModule: ModuleGetter = (moduleName) => moduleMap.get(moduleName);

  useModule(new SceneBuilder(getModule, canvasElement));
  useModule(new StateStore());
  useModule(new CommandExecutor(getModule));
  useModule(new SketchObjectManager(getModule));
  useModule(new ControllerSwitcher(getModule));

  return { moduleMap, getModule };
}

export type ModuleNameUnion = keyof typeof moduleNameDefinition;

export type ModuleNameMap = {
  [K in ModuleNameUnion]: InstanceType<(typeof moduleNameDefinition)[K]>;
};


export type Module = {
  name: ModuleNameUnion;
  dispose?(): void;
};

export type ModuleGetter = <K extends ModuleNameUnion>(
  moduleName: K,
) => ModuleNameMap[K];
