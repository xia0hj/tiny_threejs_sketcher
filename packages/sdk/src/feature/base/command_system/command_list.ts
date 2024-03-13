import { Command } from "@src/feature/base/command_system";

export const commandList: Command[] = [

] as const;



export const COMMAND_KEY = Object.freeze(
  commandList.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
);