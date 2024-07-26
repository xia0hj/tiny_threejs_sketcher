import { CAMERA_TYPE } from "@src/constant/enum";
import { MODULE_NAME, Module } from "@src/modules";
import { ValueOf } from "@src/utils";
import mitt from "mitt";

export type GlobalState = {
  curCameraType: ValueOf<typeof CAMERA_TYPE>;
};

export class GlobalStore implements Module {
  name = MODULE_NAME.GlobalStore;

  install() {}
  dispose() {
    this.#stateMap.clear();
    this.#emitter.all.clear();
  }

  #stateMap = new Map();
  #emitter = mitt<GlobalState>();

  public getState<K extends keyof GlobalState>(key: K): GlobalState[K] {
    return this.#stateMap.get(key);
  }

  public getEmitter() {
    return this.#emitter;
  }
}
