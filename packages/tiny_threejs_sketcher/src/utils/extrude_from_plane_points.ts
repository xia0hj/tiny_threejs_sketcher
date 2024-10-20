import {
    BufferGeometry,
    ExtrudeGeometry,
    Quaternion,
    Shape,
    Vector2,
    Vector3,
} from "three";

export function extrudeFromPlanePoints(
    points: Vector3[],
    planeNormal: Vector3,
    position: Vector3,
) {
    const q = new Quaternion().setFromUnitVectors(
        planeNormal,
        new Vector3(0, 0, 1),
    );

    const shapePoints: Vector2[] = [];
    const pointsOnXY = new BufferGeometry()
        .setFromPoints(points)
        .applyQuaternion(q)
        .getAttribute("position");
    for (let i = 0; i < pointsOnXY.count; i++) {
        shapePoints.push(new Vector2(pointsOnXY.getX(i), pointsOnXY.getY(i)));
    }

    const extrudeGeometry = new ExtrudeGeometry(new Shape(shapePoints));
    extrudeGeometry.applyQuaternion(q.invert());
    extrudeGeometry.translate(position.x, position.y, position.z);
    return extrudeGeometry;
}
