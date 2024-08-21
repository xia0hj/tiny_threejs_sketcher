import {
  MODULE_NAME,
  Module,
  ModuleGetter,
} from "@src/modules/module_registry";
import { CommandExecutionResult } from "@src/modules/command_executor/command_execution_result";
import { checkIsUndoableCommand } from "@src/utils";
import { CONFIG_VARS } from "@src/constant/config";

export type Command = {
  name: string;
  execute: (getModule: ModuleGetter) => Promise<CommandExecutionResult>;
  undo?: (getModule: ModuleGetter) => Promise<CommandExecutionResult>;
};

export type UndoableCommand = Command & Required<Command["undo"]>;

export class CommandExecutor implements Module {
  name = MODULE_NAME.CommandExecutor;
  getModule: ModuleGetter;

  private _modificationHistory: UndoableCommand[] = [];

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  async executeCommand(command: Command) {
    const result = await command.execute(this.getModule);
    result.match(
      () => {
        if (checkIsUndoableCommand(command)) {
          this._modificationHistory.push(command);
        }
      },
      (error) => {
        if (CONFIG_VARS.debug) {
          console.error(error);
        }
      },
    );
    return result;
  }
}
