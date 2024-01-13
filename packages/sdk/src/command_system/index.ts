import { CommandList, CommandKeyList } from "@src/command_system/command_list";
import { getInstanceContext } from "@src/instance_context";
import { type CommandParameter } from "@src/command_system/command_list";
import { Command, ModificationHistory } from "@src/command_system/type";

export class CommandSystem {
  sceneUuid: string;

  modificationHistoryList: ModificationHistory[];
  modificationHistoryIndex: number;

  commandMap: Map<string, Command>;

  constructor(sceneUuid: string) {
    this.sceneUuid = sceneUuid;
    this.modificationHistoryList = [];
    this.modificationHistoryIndex = -1;
    this.commandMap = new Map<string, Command>();

    CommandList.forEach((command) => this.commandMap.set(command.key, command));
  }

  runCommand<KEY extends keyof CommandParameter>(
    key: KEY,
    parameter: CommandParameter[KEY],
  ): void;
  runCommand<
    KEY extends Exclude<
      (typeof CommandKeyList)[keyof typeof CommandKeyList],
      keyof CommandParameter
    >,
  >(key: KEY, parameter?: undefined): void;
  runCommand<KEY extends (typeof CommandKeyList)[keyof typeof CommandKeyList]>(
    key: KEY,
    parameter: any,
  ): void {
    const command = this.commandMap.get(key);
    if (command == null) {
      return;
    }
    const context = getInstanceContext(this.sceneUuid);
    if (command.modification) {
      const modificationHistory = command.run(context, parameter);
      this.modificationHistoryList.push(modificationHistory);
      this.modificationHistoryIndex++;
    } else {
      command.run(context, parameter);
    }
  }

  undo(step: number = 1) {
    const rollbackIndex = this.modificationHistoryIndex - step + 1;
    if (rollbackIndex < 0) {
      return;
    }
    for (let i = this.modificationHistoryIndex; i >= rollbackIndex; i--) {
      const modificationHistory = this.modificationHistoryList[i];
      modificationHistory.rollback();
    }
    this.modificationHistoryIndex = rollbackIndex - 1;
  }
}
