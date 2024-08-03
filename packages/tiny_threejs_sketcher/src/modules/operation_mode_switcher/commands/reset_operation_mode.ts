import { Command } from "@src/modules/command_executor";
import { commandOk } from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { DefaultOperationMode } from "@src/modules/operation_mode_switcher/operation_modes/default_operation_mode";

export class CommandResetOperationMode implements Command {
  name = "reset_operation_mode";

  async execute(getModule: ModuleGetter) {
    const OperationModeSwitcher = getModule(MODULE_NAME.OperationModeSwitcher);
    if (getModule(MODULE_NAME.StateStore).getState().editingBasePlane) {
      OperationModeSwitcher.setOperationMode(new DefaultOperationMode()); // todo 2d operation mode
    } else {
      OperationModeSwitcher.setOperationMode(new DefaultOperationMode());
    }
    return commandOk();
  }
}
