import { MODULE_NAME, Module, ModuleGetter, ModuleNameMap, ModuleNameUnion } from "@src/modules";
import {
  COMMAND_KEY,
  CommandKeyMap,
  allCommands,
} from "@src/modules/command_system/all_commands";
import { TinyThreejsSketcher } from "@src/tiny_threejs_sketcher";
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
    this.getModule = getModule
  }

  runCommand(key: ValueOf<typeof COMMAND_KEY>, parameter?: any) {
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
      run: (getModule: ModuleGetter, parameter?: any) => void;
    }
  | {
      key: K;
      modification: true;
      run: (getModule: ModuleGetter, parameter?: any) => ModificationHistory;
    }
>;

export type ModificationHistory = Readonly<{
  key: string;
  parameter?: any;
  rollback: () => void;
}>;
