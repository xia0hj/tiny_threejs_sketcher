import {
  MODULE_NAME,
  Module,
  ModuleGetter,
  ModuleNameUnion,
  initAllModules,
} from "@src/modules/module_registry";
import { Command } from "@src/modules/command_executor";
import { CommandFitCameraToScene } from "@src/modules/scene_builder/commands/fit_camera_to_scene";
import { SketcherState } from "@src/modules/state_store";
import { CommandExecutionResult } from "@src/modules/command_executor/command_execution_result";

export class TinyThreejsSketcher {
  private _moduleMap: Map<ModuleNameUnion, Module>;
  public getModule: ModuleGetter;

  constructor(canvasElement: HTMLCanvasElement) {
    const { moduleMap, getModule } = initAllModules(canvasElement);
    this._moduleMap = moduleMap;
    this.getModule = getModule;
  }

  public startRender(): void {
    this.getModule(MODULE_NAME.SceneBuilder).startRender();
    this.getModule(MODULE_NAME.CommandExecutor).executeCommand(
      new CommandFitCameraToScene(),
    );
    this.getModule(MODULE_NAME.OperationModeSwitcher).startListenCanvas();
    this.getModule(MODULE_NAME.SketchObjectManager).refreshTree();
  }

  public executeCommand(command: Command): Promise<CommandExecutionResult> {
    return this.getModule(MODULE_NAME.CommandExecutor).executeCommand(command);
  }

  public addStateListener<K extends keyof SketcherState>(
    key: K,
    listener: (value: SketcherState[K]) => void,
  ): () => void {
    return this.getModule(MODULE_NAME.StateStore).listenState(key, listener);
  }

  public dispose(): void {
    Array.from(this._moduleMap.values())
      .reverse()
      .forEach((module) => {
        module.dispose?.();
      });
  }
}
