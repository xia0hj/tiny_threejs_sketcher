import { CAMERA_TYPE } from "@src/constant/enum";
import { MODULE_NAME, Module } from "@src/modules/module_registry";
import { SketchObject } from "@src/modules/sketch_object";
import { SketchObjectTreeItem } from "@src/modules/sketch_object_manager";
import { ValueOf } from "@src/utils";
import mitt from "mitt";

export type SketcherState = {
  curCameraType: ValueOf<typeof CAMERA_TYPE>;
  sketchObjectTreeRoot?: SketchObjectTreeItem;
  selectedObjects: SketchObject[];

  /** 用于区分是否处于 2d 草图模式 */
  editingBasePlane?: SketchObject;
};


export class StateStore implements Module {
  name = MODULE_NAME.StateStore;
  emitter = mitt<SketcherState>();

  state: SketcherState = {
    curCameraType: CAMERA_TYPE.perspectiveCamera,
    selectedObjects: [],
  }

  public getState(): SketcherState {
    return this.state;
  }

  public setState(state: Partial<SketcherState>) {
    Object.entries(state).forEach(([key, value]) => {
      this.state[key as keyof SketcherState] = value as any;
      this.emitter.emit(key as keyof SketcherState, value);
    });
  }

  public getEmitter() {
    return this.emitter;
  }

  dispose() {
    this.emitter.all.clear();
  }
}
