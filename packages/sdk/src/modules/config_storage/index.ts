import { MODULE_NAME, Module } from "@src/modules";

export type Options = Readonly<{
  debug: boolean;
  sceneBackgroundColor: number;
  axesHelperLineLength: number;
}>;

export class ConfigStorage implements Module {
  name = MODULE_NAME.ConfigStorage;
  install() {}
  dispose() {}

  #options!: Options;
  setInitOptions(initOptions: Partial<Options> | undefined) {
    const mergedOptions: Options = {
      debug: initOptions?.debug ?? false,
      sceneBackgroundColor: initOptions?.sceneBackgroundColor ?? 0xaaaaaa,
      axesHelperLineLength: initOptions?.axesHelperLineLength ?? 5,
    };
    this.#options = Object.freeze(mergedOptions);
  }

  getOptions() {
    return this.#options;
  }
}
