import {
  MODULE_NAME,
  Module,
  ModuleNameMap,
  ModuleNameUnion,
  initAllModules,
} from "@src/modules";
import { COMMAND_KEY } from "@src/modules/command_system/all_commands";
import { Options } from "@src/modules/configurator";
import { ValueOf } from "@src/utils";

export class ThreeCadEditor {
  #modules = new Map();

  constructor(canvasElement: HTMLCanvasElement, options?: Partial<Options>) {
    this.#modules = initAllModules(canvasElement, options)
  }

  public getModule<Name extends ModuleNameUnion>(moduleName: Name) {
    return this.#modules.get(moduleName) as ModuleNameMap[Name];
  }

  public startRender() {
    this.getModule(MODULE_NAME.SceneBuilder).startRender();
    this.getModule(MODULE_NAME.CommandSystem).runCommand(
      COMMAND_KEY.fitCameraToScene,
    );
  }

  public runCommand(key: ValueOf<typeof COMMAND_KEY>, parameter?: any) {
    this.getModule(MODULE_NAME.CommandSystem).runCommand(key, parameter);
  }

  public dispose() {
    for(const module of this.#modules.values()) {
      module.dispose?.();
    }
  }

}
