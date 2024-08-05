import { MODULE_NAME, Module } from "@src/modules/module_registry";

export type Options = Readonly<{
  debug: boolean;
  sceneBackgroundColor: number;
  axesHelperLineLength: number;
  planeColor: number;
  planeSelectColor: number;
  planeLength: number;
  planeOpacity: number;
  pressMinDuration: number;
}>;

export class Configurator implements Module {
  name = MODULE_NAME.Configurator;

  #options: Options;
  constructor(initOptions?: Partial<Options>) {
    const defaultOptions: Options = {
      debug: false,
      sceneBackgroundColor: 0xaaaaaa,
      axesHelperLineLength: 5,
      planeColor: 0x2193b0,
      planeSelectColor: 0x54ff9f, // todo
      planeLength: 3,
      planeOpacity: 0.6,
      pressMinDuration: 100,
    };

    const mergedOptions = Object.assign(defaultOptions, initOptions);
    this.#options = Object.freeze(mergedOptions);
  }

  getOptions() {
    return this.#options;
  }

  dispose() {}
}
