
import { MODULE_NAME, Module, ModuleGetter, ModuleNameMap } from "@src/modules";
import { ValueOf } from "@src/utils";
import { Group } from "three";

export class SketchObjectManager implements Module {
  name = MODULE_NAME.SketchObjectManager;
  getModule!: ModuleGetter;
  install(getModule: ModuleGetter) {
    this.getModule = getModule;
  }
  dispose() {}

  sketchObjectGroup = buildSketchObjectGroup();
  previewGroup = new Group();
}

function buildSketchObjectGroup(): Group {
  const sketchObjectGroup = new Group();
  sketchObjectGroup.userData.type = "ROOT";
  return sketchObjectGroup;
}
