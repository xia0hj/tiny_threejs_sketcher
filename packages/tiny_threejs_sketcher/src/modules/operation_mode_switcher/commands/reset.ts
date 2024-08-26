import { Command } from "@src/modules/command_executor";
import { commandOk } from "@src/modules/command_executor/command_execution_result";
import { MODULE_NAME, ModuleGetter } from "@src/modules/module_registry";
import { DefaultOperationMode } from "@src/modules/operation_mode_switcher/operation_modes/default_operation_mode";

export class CommandResetDefaultOperationMode implements Command {
  name = "reset_default_operation_mode";

  async execute(getModule: ModuleGetter) {
    const operationModeSwitcher = getModule(MODULE_NAME.OperationModeSwitcher);
    operationModeSwitcher.setOperationMode(new DefaultOperationMode());
    return commandOk();
  }
}
