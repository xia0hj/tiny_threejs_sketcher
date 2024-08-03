
import { Configurator, Options } from "@src/modules/configurator";
import { StateStore } from "@src/modules/state_store";
import { OperationModeSwitcher } from "@src/modules/operation_mode_switcher";
import { SceneBuilder } from "@src/modules/scene_builder";
import { SketchObjectManager } from "@src/modules/sketch_object_manager";

import { CommandExecutor } from "@src/modules/command_executor";
import { ValueOf } from "@src/utils";

// register modules here, then call useModule() in initAllModules
const moduleNameDefinition = Object.freeze({
  Configurator,
  SceneBuilder,
  StateStore,
  CommandExecutor,
  SketchObjectManager,
  OperationModeSwitcher,
});
export function initAllModules(
  canvasElement: HTMLCanvasElement,
  options?: Partial<Options>,
) {
  const moduleMap = new Map();
  const useModule = (module: ValueOf<ModuleNameMap>) => moduleMap.set(module.name, module);
  const getModule: ModuleGetter = (moduleName) => moduleMap.get(moduleName);

  useModule(new Configurator(options));
  useModule(new SceneBuilder(getModule, canvasElement));
  useModule(new StateStore());
  useModule(new CommandExecutor(getModule));
  useModule(new SketchObjectManager(getModule));
  useModule(new OperationModeSwitcher(getModule));
  
  return { moduleMap, getModule };
}

export type ModuleNameUnion = keyof typeof moduleNameDefinition;

export type ModuleNameMap = {
  [K in ModuleNameUnion]: InstanceType<(typeof moduleNameDefinition)[K]>
};

export const MODULE_NAME = (
  Object.keys(moduleNameDefinition) as Array<ModuleNameUnion>
).reduce(
  (obj, curKey) => {
    obj[curKey] = curKey;
    return obj;
  },
  {} as Record<string, string>,
) as Readonly<{ [K in ModuleNameUnion]: K }>;

export type Module = {
  name: ModuleNameUnion;
  getModule?: ModuleGetter;
  dispose?: () => void;
};

export type ModuleGetter = <K extends ModuleNameUnion>(
  moduleName: K,
) => ModuleNameMap[K];

