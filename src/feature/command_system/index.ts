import { SceneTool } from "@/common/type";
import { COMMAND_LIST } from "@/feature/command_system/command_list";

export type Command = {
  key: string;
  run: (...param: any[]) => void;
};

export class CommandSystem implements SceneTool {
  commandMap: Map<string, Command>;
  commandRunHistory: Command[];
  isActive: boolean = false;

  init() {
    this.commandMap = new Map();
    this.commandRunHistory = [];
    COMMAND_LIST.forEach((command) => {
      this.commandMap.set(command.key, command);
    });
    this.isActive = true;
  }

  public runCommand(key: string, commandParameter: any) {
    const command = this.commandMap.get(key);
    if (command != null) {
      this.commandRunHistory.push(command);
      command.run(commandParameter);
    }
  }

  dispose() {
    this.commandMap.clear();
    this.commandRunHistory = [];
    this.isActive = false;
  }
}
