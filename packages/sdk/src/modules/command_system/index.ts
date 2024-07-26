import { MODULE_NAME, Module, ModuleGetter } from "@src/modules";
import { allCommands } from "@src/modules/command_system/all_commands";

export class CommandSystem implements Module {
  name = MODULE_NAME.CommandSystem;
  getModule!: ModuleGetter;
  install(getModule: ModuleGetter) {
    this.getModule = getModule;
  }

  modificationHistoryArray: ModificationHistory[] = [];
  modificationHistoryIndex: number = -1;
  commandMap: Map<string, Command> = new Map(
    allCommands.map((command) => [command.key, command]),
  );

  runCommand(key: string, parameter?: Record<string, any>) {
    const command = this.commandMap.get(key);
    if (command == undefined) {
      return;
    }
    if (command.modification) {
      const modificationHistory = command.run(this.getModule, parameter);
      this.modificationHistoryArray.push(modificationHistory);
      this.modificationHistoryIndex++;
    } else {
      command.run(this.getModule, parameter);
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
      run: (getModule: ModuleGetter, parameter?: Record<string, any>) => void;
    }
  | {
      key: K;
      modification: true;
      run: (
        getModule: ModuleGetter,
        parameter?: Record<string, any>,
      ) => ModificationHistory;
    }
>;

export type ModificationHistory = Readonly<{
  key: string;
  parameter?: object;
  rollback: () => void;
}>;
