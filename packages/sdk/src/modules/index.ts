import { GlobalStore } from "@src/modules/GlobalStore";
import { SceneBuilder } from "@src/modules/SceneBuilder";
import { ThreeCadEditor } from "@src/three_cad_editor";
import { ValueOf } from "@src/util";

export type Module = {
  name: string;
  dependencies: ModuleNameUnion[];
  install: (getModule: ThreeCadEditor["getModule"]) => void;
  dispose: () => void;
};

export function getAllModules(): ReadonlyArray<Module> {
  return Object.freeze([new SceneBuilder(), new GlobalStore()]);
}
export const MODULE_NAME = Object.freeze({
  SceneBuilder: "SceneBuilder",
  GlobalStore: "GlobalStore",
});
export type ModuleNameMap = {
  SceneBuilder: SceneBuilder;
  GlobalStore: GlobalStore;
};

export type ModuleNameUnion = ValueOf<typeof MODULE_NAME>;
