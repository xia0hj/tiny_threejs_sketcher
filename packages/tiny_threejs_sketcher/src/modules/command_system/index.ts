import {
  MODULE_NAME,
  Module,
  ModuleGetter,
} from "@src/modules";
import {
  COMMAND_KEY,
  allCommands,
} from "@src/modules/command_system/all_commands";
import { ValueOf } from "@src/utils";

export class CommandSystem implements Module {
  name = MODULE_NAME.CommandSystem;
  getModule: ModuleGetter;

  modificationHistoryArray: ModificationHistory[] = [];
  modificationHistoryIndex: number = -1;
  commandMap: Map<string, Command> = new Map(
    allCommands.map((command) => [command.key, command]),
  );

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  runCommand(key: ValueOf<typeof COMMAND_KEY>, parameter?: any): boolean {
    const command = this.commandMap.get(key);
    if (command == undefined) {
      return false;
    }
    if (command.modification) {
      const modificationHistory = command.run(this.getModule, parameter);
      if (modificationHistory == null) {
        return false
      }
      this.modificationHistoryArray.push(modificationHistory);
      this.modificationHistoryIndex++;
      return true
    } else {
      return command.run(this.getModule, parameter);
    }
  }

  dispose() {
    this.commandMap.clear();
    this.modificationHistoryArray = [];
  }
}

export type Command<K = string> = Readonly<
  | {
      key: K;
      modification: false;
      run: (getModule: ModuleGetter, parameter?: any) => boolean;
    }
  | {
      key: K;
      modification: true;
      run: (getModule: ModuleGetter, parameter?: any) => ModificationHistory | undefined;
    }
>;

export type ModificationHistory = Readonly<{
  key: string;
  parameter?: any;
  rollback: () => void;
}>;
