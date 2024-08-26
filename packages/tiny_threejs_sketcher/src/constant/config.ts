export const CONFIG_VARS = {
  enableLog: true,
  sceneBackgroundColor: 0xaaaaaa,
  axesHelperLineLength: 5,
  planeColor: 0x2193b0,
  planeSelectColor: 0x54ff9f, // todo
  planeLength: 3,
  planeOpacity: 0.6,
  pressMinDuration: 500,
  basePointSize: 10
};

export function updateConfigVars(config: Partial<typeof CONFIG_VARS>) {
  Object.assign(CONFIG_VARS, config);
}
