import { ThreeCadEditor } from "@src/three_cad_editor";

export class CommandSystem {
  threeCadEditor: ThreeCadEditor;
  modificationHistoryList: ModificationHistory[] = [];
  modificationHistoryIndex: number = -1;
  commandMap: Map<string, Command> = new Map();

  constructor(threeCadEditor: ThreeCadEditor) {
    this.threeCadEditor = threeCadEditor;
  }

  runCommand(key: string, parameter?: object) {
    const command = this.commandMap.get(key);
    if (command == undefined) {
      return;
    }
    if (command.modification) {
      const modificationHistory = command.run(this.threeCadEditor, parameter);
      this.modificationHistoryList.push(modificationHistory);
      this.modificationHistoryIndex++;
    } else {
      command.run(this.threeCadEditor, parameter);
    }
  }
}

export type Command =
  | {
      key: string;
      modification: false;
      run: (threeCadEditor: ThreeCadEditor, parameter?: object) => void;
    }
  | {
      key: string;
      modification: true;
      run: (
        threeCadEditor: ThreeCadEditor,
        parameter?: object,
      ) => ModificationHistory;
    };

type ModificationHistory = {
  key: string;
  parameter?: object;
  rollback: () => void;
};
