import { MODULE_NAME, ModuleGetter } from "@src/modules";
import { Command } from "@src/modules/command_system";
import { CreatePlaneParameter, Plane } from "@src/modules/sketch_object/base_plane";

export const commandCreatePlane = Object.freeze<Command<"create_plane">>({
  key: "create_plane",
  modification: false,
  run(getModule: ModuleGetter, parameter?: CreatePlaneParameter) {
    if (!parameter) {
      throw new Error("Error: command parameter is undefined");
    }

    const { planeColor, planeLength, planeOpacity } = getModule(
      MODULE_NAME.Configurator,
    ).getOptions();
    const defaultParameter: CreatePlaneParameter = {
      offset: 0,
      parallelTo: "XY",
      planeColor,
      planeLength,
      planeOpacity,
    };
    const mergedParameter = Object.assign(defaultParameter, parameter);

    const plane = new Plane(mergedParameter);
    getModule(MODULE_NAME.SketchObjectManager).add(plane);

    return {
      key: this.key,
      parameter,
      rollback() {
        plane.removeFromParent();
        plane.dispose();
      },
    };
  },
});
