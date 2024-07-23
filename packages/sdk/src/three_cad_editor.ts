import {
  MODULE_NAME,
  Module,
  ModuleNameMap,
  ModuleNameUnion,
  getAllModules,
} from "@src/modules";

export class ThreeCadEditor {
  #modules: Module[] = [];

  constructor() {
    getAllModules().forEach((module) => {
      module.install((getModuleName) => {
        if (!module.dependencies.includes(getModuleName)) {
          throw new Error("can not get non-dependent module");
        }
        return this.getModule(getModuleName);
      });
    });
  }

  public getModule<Name extends ModuleNameUnion>(
    moduleName: Name,
  ): ModuleNameMap[Name] {
    return this.#modules.find((module) => module.name === moduleName) as any;
  }

  public startRender(canvasElement: HTMLCanvasElement) {
    this.getModule(MODULE_NAME.SceneBuilder).startRender(canvasElement);
  }

  public dispose() {
    this.#modules.forEach((module) => module.dispose());
  }
}
