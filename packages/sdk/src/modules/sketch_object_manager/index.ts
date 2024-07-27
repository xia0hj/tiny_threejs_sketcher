import { MODULE_NAME, Module, ModuleGetter, ModuleNameMap } from "@src/modules";
import { SketchObject } from "@src/modules/sketch_object";
import { ValueOf } from "@src/utils";
import { Group } from "three";

export class SketchObjectManager implements Module {
  name = MODULE_NAME.SketchObjectManager;
  getModule: ModuleGetter;
  sketchObjectGroup = buildSketchObjectGroup();
  previewGroup = new Group();

  constructor(getModule: ModuleGetter) {
    this.getModule = getModule;
    const sceneBuilder = getModule(MODULE_NAME.SceneBuilder);
    sceneBuilder.scene.add(this.sketchObjectGroup);
    sceneBuilder.scene.add(this.previewGroup);
  }

  add(obj: SketchObject) {
    this.sketchObjectGroup.add(obj);
  }

  dispose() {
    this.sketchObjectGroup.removeFromParent();
    this.sketchObjectGroup.clear();
    this.previewGroup.removeFromParent();
    this.previewGroup.clear();
  }
}

function buildSketchObjectGroup(): Group {
  const sketchObjectGroup = new Group();
  sketchObjectGroup.userData.type = "ROOT";
  return sketchObjectGroup;
}
