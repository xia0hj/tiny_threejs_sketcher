import { Command } from "@src/command_system";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export const COMMAND_LIST: Command[] = [
    {
        key: "test_command",
        modification: true,
        run(context, commandParameter) {
            const { length } = commandParameter as { length: number };
            const cube = new Mesh(
                new BoxGeometry(length, length, length),
                new MeshStandardMaterial(),
            );
            context.sceneRenderer?.sketchObjectGroup.add(cube);
            return {
                key: this.key,
                parameter: { length },
                rollback: () => cube.removeFromParent(),
            };
        },
    },
];
