import { Command, UndoableCommand } from "@src/modules/command_executor";
import { SketchObject } from "@src/modules/sketch_object";
import { Object3D } from "three";

export type ValueOf<OBJ extends { [key: string]: any }> = OBJ[keyof OBJ];

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export function checkIsSketchObject(obj: Object3D): obj is SketchObject {
  return obj.userData.type != null || obj.userData.type !== "";
}

export function checkIsUndoableCommand(command: Command): command is UndoableCommand {
  return command.undo != null;
}
