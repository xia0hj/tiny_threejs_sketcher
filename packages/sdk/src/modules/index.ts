import { CommandSystem } from "@src/modules/command_system";
import { ConfigStorage, Options } from "@src/modules/config_storage";
import { GlobalStore } from "@src/modules/global_store";
import { OperationModeSwitcher } from "@src/modules/operation_mode_switcher";
import { SceneBuilder } from "@src/modules/scene_builder";
import { SketchObjectManager } from "@src/modules/sketch_object_manager";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { ValueOf } from "@src/util";

// register all modules here
export function getAllModules(): ReadonlyArray<Module> {
  return Object.freeze([
    new ConfigStorage(),
    new SceneBuilder(),
    new GlobalStore(),
    new CommandSystem(),
    new SketchObjectManager(),
    new OperationModeSwitcher(),
  ]);
}
export const MODULE_NAME = Object.freeze({
  SceneBuilder: "SceneBuilder",
  GlobalStore: "GlobalStore",
  CommandSystem: "CommandSystem",
  OperationModeSwitcher: "OperationModeSwitcher",
  SketchObjectManager: "SketchObjectManager",
  ConfigStorage: "ConfigStorage",
});
export type ModuleNameMap = {
  SceneBuilder: SceneBuilder;
  GlobalStore: GlobalStore;
  CommandSystem: CommandSystem;
  OperationModeSwitcher: OperationModeSwitcher;
  SketchObjectManager: SketchObjectManager;
  ConfigStorage: ConfigStorage;
};

export type Module = {
  name: string;
  install: (getModule: ModuleGetter) => void;
  dispose: () => void;
};

export type ModuleGetter = ThreeCadEditor["getModule"];
