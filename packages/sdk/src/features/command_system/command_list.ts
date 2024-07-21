import { commandFitCameraToScene } from "@src/features/camera";
import { commandCreatePlane } from "@src/features/sketch_object/sketch_plane";
import {
  commandEnterSketcher2d,
  commandExitSketcher2d,
} from "@src/features/sketcher_2d/idnex";
import {
  commandAddLine2d,
  commandStartDrawLine,
  commandStopDrawLine,
} from "@src/features/sketch_object/line2d";

export const commandList = Object.freeze([
  commandFitCameraToScene,
  commandCreatePlane,
  commandEnterSketcher2d,
  commandExitSketcher2d,
  commandStartDrawLine,
  commandAddLine2d,
  commandStopDrawLine,
]);

export const COMMAND_KEY = Object.freeze(
  commandList.reduce<{ [key: string]: any }>((obj, command) => {
    obj[command.key] = command.key;
    return obj;
  }, {}),
) as Readonly<{ [K in (typeof commandList)[number]["key"]]: K }>;
