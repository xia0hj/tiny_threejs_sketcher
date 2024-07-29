import { commandFitCameraToScene } from "@src/modules/scene_builder/commands/fit_camera_to_scene";
import { commandCreatePlane } from "@src/modules/sketch_object/base_plane/commands/create_base_plane";

export const allCommands = Object.freeze([
  commandFitCameraToScene,
  commandCreatePlane,
]);

export const COMMAND_KEY = Object.freeze(
  allCommands.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
) as Readonly<{ [K in (typeof allCommands)[number]["key"]]: K }>;

export type CommandKeyMap = {
  [K in (typeof allCommands)[number]["key"]]: Extract<
    (typeof allCommands)[number],
    { key: K }
  >;
};
