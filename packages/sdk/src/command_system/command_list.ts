import {
  CommandSetOrthographicCamera,
  CommandSetPerspectiveCamera,
  CommandUndo,
} from "@src/three_cad_editor/command";
import {
  CommandCreatePlane,
  CommandEditPlane,
} from "@src/sketch_object/sketch_plane";
import { ValueOf } from "@src/util";

export const CommandList = {
  [CommandCreatePlane.key]: CommandCreatePlane,
  [CommandUndo.key]: CommandUndo,
  [CommandSetOrthographicCamera.key]: CommandSetOrthographicCamera,
  [CommandSetPerspectiveCamera.key]: CommandSetPerspectiveCamera,
  [CommandEditPlane.key]: CommandEditPlane,
} as const;

export const CommandKeyList = Object.keys(CommandList).reduce(
  (commandKeyMap, key) => {
    (commandKeyMap as any)[key] = key;
    return commandKeyMap;
  },
  {},
) as { [KEY in ValueOf<typeof CommandList>["key"]]: KEY };
