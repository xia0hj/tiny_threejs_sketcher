import { type Command } from "@src/features/base/command_system";
import { commandFitCameraToScene } from "@src/features/camera";

export const commandList = Object.freeze([commandFitCameraToScene]);

export const COMMAND_KEY = Object.freeze(
  commandList.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
) as Readonly<{ [K in (typeof commandList)[number]["key"]]: K }>;
