import { commandFitCameraToScene } from "@src/modules/scene_builder/commands/fit_camera_to_scene";

export const allCommands = Object.freeze([commandFitCameraToScene]);

export const COMMAND_KEY = Object.freeze(
  allCommands.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
) as Readonly<{ [K in (typeof allCommands)[number]["key"]]: K }>;
