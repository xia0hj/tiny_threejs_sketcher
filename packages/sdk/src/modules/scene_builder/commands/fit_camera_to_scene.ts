import { MODULE_NAME, ModuleGetter } from "@src/modules";
import { Command } from "@src/modules/command_system";
import { Box3, Sphere, Vector3 } from "three";

export const commandFitCameraToScene: Command<"fitCameraToScene"> = {
  key: "fitCameraToScene",
  modification: false,

  run(getModule: ModuleGetter) {
    const options = getModule(MODULE_NAME.ConfigStorage).getOptions();

    const { perspectiveCamera, orthographicCamera, orbitControls } = getModule(
      MODULE_NAME.SceneBuilder,
    );

    const sketchObjectManager = getModule(MODULE_NAME.SketchObjectManager);
    const boundingSphere =
      sketchObjectManager.sketchObjectGroup.children.length === 0
        ? new Sphere(new Vector3(0, 0, 0), options.axesHelperLineLength)
        : new Box3()
            .setFromObject(sketchObjectManager.sketchObjectGroup)
            .getBoundingSphere(new Sphere());

    // handle perspectiveCamera
    const fov = (perspectiveCamera.fov * Math.PI) / 180;
    const distance = boundingSphere.radius / Math.sin(fov / 2);
    perspectiveCamera.position.set(
      boundingSphere.center.x + distance,
      boundingSphere.center.y + distance,
      boundingSphere.center.z + distance,
    );
    perspectiveCamera.zoom = 0.9;

    // handle orthographicCamera
    const cameraWidth = orthographicCamera.right - orthographicCamera.left;
    const cameraHeight = orthographicCamera.top - orthographicCamera.bottom;
    if (cameraWidth >= cameraHeight) {
      orthographicCamera.top = boundingSphere.radius;
      orthographicCamera.bottom = -boundingSphere.radius;
      orthographicCamera.left =
        -boundingSphere.radius * (cameraWidth / cameraHeight);
      orthographicCamera.right =
        boundingSphere.radius * (cameraWidth / cameraHeight);
    } else {
      orthographicCamera.left = -boundingSphere.radius;
      orthographicCamera.right = boundingSphere.radius;
      orthographicCamera.top =
        boundingSphere.radius * (cameraHeight / cameraWidth);
      orthographicCamera.bottom =
        -boundingSphere.radius * (cameraHeight / cameraWidth);
    }
    orthographicCamera.position.set(
      boundingSphere.center.x + boundingSphere.radius,
      boundingSphere.center.y + boundingSphere.radius,
      boundingSphere.center.z + boundingSphere.radius,
    );
    orthographicCamera.zoom = 0.9;

    orbitControls.target = boundingSphere.center;
  },
};
