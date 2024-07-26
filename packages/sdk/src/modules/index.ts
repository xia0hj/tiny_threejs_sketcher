import { CommandSystem } from "@src/modules/command_system";
import { ConfigStorage, Options } from "@src/modules/config_storage";
import { GlobalStore } from "@src/modules/global_store";
import { OperationModeSwitcher } from "@src/modules/operation_mode_switcher";
import { SceneBuilder } from "@src/modules/scene_builder";
import { SketchObjectManager } from "@src/modules/sketch_object_manager";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { ValueOf } from "@src/utils";

// register module name, then add module into all modules array
export const MODULE_NAME = Object.freeze({
  SceneBuilder: "SceneBuilder",
  GlobalStore: "GlobalStore",
  CommandSystem: "CommandSystem",
  OperationModeSwitcher: "OperationModeSwitcher",
  SketchObjectManager: "SketchObjectManager",
  ConfigStorage: "ConfigStorage",
});
export function getAllModules() {
  return [
    [MODULE_NAME.ConfigStorage, new ConfigStorage()] as const,
    [MODULE_NAME.SceneBuilder, new SceneBuilder()] as const,
    [MODULE_NAME.GlobalStore, new GlobalStore()] as const,
    [MODULE_NAME.CommandSystem, new CommandSystem()] as const,
    [MODULE_NAME.SketchObjectManager, new SketchObjectManager()] as const,
    [MODULE_NAME.OperationModeSwitcher, new OperationModeSwitcher()] as const,
  ] as const;
}

export type ModuleNameMap = {
  [K in ReturnType<typeof getAllModules>[number][0]]: Extract<
    ReturnType<typeof getAllModules>[number][1],
    { name: K }
  >;
};

export type Module = {
  name: string;
  install: (getModule: ModuleGetter) => void;
  dispose: () => void;
};

export type ModuleGetter = ThreeCadEditor["getModule"];
