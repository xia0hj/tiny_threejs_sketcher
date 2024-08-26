import {
  MODULE_NAME,
  Module,
  ModuleGetter,
} from "@src/modules/module_registry";
import { CommandExecutionResult } from "@src/modules/command_executor/command_execution_result";
import { checkIsUndoableCommand } from "@src/utils";
import { logger } from "@src/utils/logger";

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
      (value) => {
        logger.debug(`命令 ${command.name} 执行成功.`, value ?? "");
        if (checkIsUndoableCommand(command)) {
          this._modificationHistory.push(command);
        }
      },
      (error) => logger.warn(`命令 ${command.name} 执行失败`, error),
    );
    return result;
  }
}
