import {
  MODULE_NAME,
  Module,
  ModuleNameMap,
  getAllModules,
} from "@src/modules";
import { COMMAND_KEY } from "@src/modules/command_system/all_commands";
import { Options } from "@src/modules/config_storage";
import { ValueOf } from "@src/util";

export class ThreeCadEditor {
  #modules: Module[] = [];

  constructor(options?: Partial<Options>) {
    getAllModules().forEach((module) => {
      module.install((getModuleName) => this.getModule(getModuleName));
      this.#modules.push(module);
    });
    this.getModule(MODULE_NAME.ConfigStorage).setInitOptions(options);
  }

  public getModule<Name extends ValueOf<typeof MODULE_NAME>>(moduleName: Name) {
    return this.#modules.find(
      (module) => module.name === moduleName,
    ) as ModuleNameMap[Name];
  }

  public startRender(canvasElement: HTMLCanvasElement) {
    this.getModule(MODULE_NAME.SceneBuilder).startRender(canvasElement);
    this.getModule(MODULE_NAME.CommandSystem).runCommand(
      COMMAND_KEY.fitCameraToScene,
    );
    this.getModule(MODULE_NAME.OperationModeSwitcher).startListenCanvas(
      canvasElement,
    );
  }

  public dispose() {
    this.#modules.forEach((module) => module.dispose());
  }
}
