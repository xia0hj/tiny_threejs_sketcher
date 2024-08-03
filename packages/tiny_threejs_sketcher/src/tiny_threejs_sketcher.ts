import { CommandFitCameraToScene } from "@src/index";
import {
  MODULE_NAME,
  Module,
  ModuleGetter,
  ModuleNameUnion,
  initAllModules,
} from "@src/modules/module_registry";
import { Command } from "@src/modules/command_executor";
import { Options } from "@src/modules/configurator";

export class TinyThreejsSketcher {
  #moduleMap: Map<ModuleNameUnion, Module>;
  public getModule: ModuleGetter;

  constructor(canvasElement: HTMLCanvasElement, options?: Partial<Options>) {
    const { moduleMap, getModule } = initAllModules(canvasElement, options);
    this.#moduleMap = moduleMap;
    this.getModule = getModule;
  }

  public startRender() {
    this.getModule(MODULE_NAME.SceneBuilder).startRender();
    this.getModule(MODULE_NAME.CommandExecutor).executeCommand(
      new CommandFitCameraToScene(),
    );
    this.getModule(MODULE_NAME.OperationModeSwitcher).startListenCanvas();
    this.getModule(MODULE_NAME.SketchObjectManager).refreshTree();
  }

  public executeCommand(command: Command) {
    return this.getModule(MODULE_NAME.CommandExecutor).executeCommand(command);
  }

  public dispose() {
    Array.from(this.#moduleMap.values())
      .reverse()
      .forEach((module) => {
        module.dispose?.();
      });
  }
}
