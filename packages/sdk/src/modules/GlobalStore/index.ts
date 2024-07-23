import { MODULE_NAME, Module, ModuleNameUnion } from "@src/modules";

export class GlobalStore implements Module {
  dependencies = [MODULE_NAME.SceneBuilder];

  name = MODULE_NAME.GlobalStore;

  install(a:any) {}
  dispose() {}
}
