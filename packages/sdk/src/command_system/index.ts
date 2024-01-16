import { CommandList } from "@src/command_system/command_list";
import { InstanceContext } from "@src/instance_context";

export class CommandSystem {
  context: InstanceContext;

  modificationHistoryList: ModificationHistory[];
  modificationHistoryIndex: number;

  commandMap: Map<string, Command<any, any>>;

  constructor(context: InstanceContext) {
    this.context = context;
    this.modificationHistoryList = [];
    this.modificationHistoryIndex = -1;
    this.commandMap = new Map();

    Object.values(CommandList).forEach((command) => {
      this.commandMap.set(command.key, command);
    });
  }

  runCommand<
    K extends keyof typeof CommandList,
    P extends Parameters<(typeof CommandList)[K]["run"]>[1],
  >(commandInput: P extends undefined ? { key: K } : { key: K; parameter: P }) {
    const command = this.commandMap.get(commandInput.key);
    if (command == null) {
      return;
    }
    if (command.modification) {
      const modificationHistory = command.run(
        this.context,
        (commandInput as any).parameter,
      );
      this.modificationHistoryList.push(modificationHistory);
      this.modificationHistoryIndex++;
    } else {
      command.run(this.context, (commandInput as any).parameter);
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

/**
 * @param {K} K key of command
 * @param {P} P type of command parameter
 */
export type Command<K, P = undefined> =
  | {
      key: K;
      modification: false;
      run: P extends undefined
        ? (context: InstanceContext) => void
        : (context: InstanceContext, parameter: P) => void;
    }
  | {
      key: K;
      modification: true;
      run: P extends undefined
        ? (context: InstanceContext) => ModificationHistory<K, P>
        : (context: InstanceContext, parameter: P) => ModificationHistory<K, P>;
    };

type ModificationHistory<K = string, P = undefined> = P extends undefined
  ? { key: K; rollback: () => void }
  : { key: K; parameter: P; rollback: () => void };
