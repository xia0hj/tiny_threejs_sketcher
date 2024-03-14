import { AXES_HELPER_LINE_LENGTH } from "@src/constant/config";
import { CAMERA_TYPE } from "@src/constant/enum";
import { Command } from "@src/features/base/command_system";
import { Box3, Sphere, Vector3 } from "three";

export const commandFitCameraToScene: Command<"fit_camera_to_scene"> = {
  key:"fit_camera_to_scene",
  modification: false,
  run(threeCadEditor) {

    const {
      sketchObjectGroup,
      globalStore,
      perspectiveCamera,
      orthographicCamera,
      orbitControls
    } = threeCadEditor

    const boundingSphere =
    sketchObjectGroup.children.length === 0
      ? new Sphere(new Vector3(0, 0, 0), AXES_HELPER_LINE_LENGTH)
      : new Box3()
          .setFromObject(sketchObjectGroup)
          .getBoundingSphere(new Sphere());

  const currentCameraType = globalStore.getState("currentCameraType");

  if (currentCameraType === CAMERA_TYPE.perspectiveCamera) {
    const fov = (perspectiveCamera.fov * Math.PI) / 180;
    const distance = boundingSphere.radius / Math.sin(fov / 2);
    perspectiveCamera.position.set(
      boundingSphere.center.x + distance,
      boundingSphere.center.y + distance,
      boundingSphere.center.z + distance,
    );
    perspectiveCamera.zoom = 0.9;
    orbitControls.target = boundingSphere.center;
  } else if (currentCameraType === CAMERA_TYPE.orthographicCamera) {
    const cameraWidth =
      orthographicCamera.right - orthographicCamera.left;
    const cameraHeight =
      orthographicCamera.top - orthographicCamera.bottom;
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
  }
  },
}