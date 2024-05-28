import { type Command } from "@src/features/command_system";
import { commandFitCameraToScene } from "@src/features/camera";
import { commandCreatePlane } from "@src/features/sketch_object/sketch_plane";

export const commandList = Object.freeze([
  commandFitCameraToScene,
  commandCreatePlane
]);

export const COMMAND_KEY = Object.freeze(
  commandList.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
) as Readonly<{ [K in (typeof commandList)[number]["key"]]: K }>;
