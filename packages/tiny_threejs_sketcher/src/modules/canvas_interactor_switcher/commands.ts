import { Command } from "@src/modules/command_executor";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";

/**
 * @exports
 */
export class CommandExitCurInteractor implements Command {
  name = "exit_cur_interactor";
  execute(getModule: ModuleGetter) {
    return getModule(MODULE_NAME.CanvasInteractorSwitcher).popInteractor();
  }
}
